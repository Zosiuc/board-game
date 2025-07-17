import React, {useEffect, useState} from 'react';
import "./moderator-panel.scss";
import Footer from "../../../components/footer/Footer";
import VennBoard from "../../../components/game/vennBoard/VennBoard";
import {socket} from "../../../socket/client";
import {useTranslation} from "react-i18next";
import {useGameContext} from "../../../context/GameContext";
import Popup from "../../../components/game/popup/Popup";



const ModeratorPanel = () => {
    const {t} = useTranslation();

    const {gameActive, setGameActive, msg,setMsg} = useGameContext();

    const {gameId} = useGameContext();
    const {setTeamId} = useGameContext();
    const { setTeamsQueAns} = useGameContext();
    const { setQuestion} = useGameContext();
    const {game, setGame} = useGameContext();
    const {teams, setTeams} = useGameContext();
    const {moderator,setModerator} = useGameContext();
    const {savedAnswers, setSavedAnswers} = useGameContext();
    const {strategies, setStrategies} = useGameContext();


    const [show, setShow] = useState(false);
    const [waiting, setWaiting] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);


    const openPopup = (team_id:string) => {
        console.log("open popup: ", team_id);
        setTeamId(team_id)
        setTeamsQueAns(savedAnswers.find(a => a.team_id === team_id)?.teamsQueAns ?? null);
        setQuestion(savedAnswers.find(a => a.team_id === team_id)?.question ?? null);
        setShow(!show);
    }

    const handleStartGame = async () => {

        socket.emit('startGame', gameId)
    }

    const handleNextRound = () => {

    }


    useEffect(() => {
        const game_id = sessionStorage.getItem("game_id");
        socket.emit("reconnecting")
        if (!game_id) return console.error('gameId not found');
        const moderator_id = sessionStorage.getItem("moderator_id");
        if (!moderator_id) return console.error('moderatorId not found');

        socket.emit("getModerator", moderator_id);
        socket.on("moderator", (moderator) => {
            setModerator(moderator);
            setLoading(false);
        });

        socket.emit("loadGame", game_id)
        socket.on("game", (game) => {
            setGame(game);
            if (game.status === "active") setGameActive(true);
            else setGameActive(false)
            setLoading(false);
            setWaiting(false);
        });


        socket.emit("getStrategies")
        socket.on("strategies", (data) => {
            if (data.error)  {
                alert(data.error);
                return setLoading(false);
        }
            setLoading(false);
            setStrategies(data.strategies);
            setLoading(false);
        });


        socket.emit("getSameRoomTeams", game_id);
        socket.on("sameRoomTeams", (teams) => {
            if (!teams) return setLoading(false);
            setTeams(teams);
            setLoading(false);

        });


        socket.off("new_answer").on("new_answer", (queAnsTeams, question) => {
            setSavedAnswers((savedAnswer) => [
                ...savedAnswer,
                {
                    teamsQueAns_id:queAnsTeams.id,
                    team_id: queAnsTeams.team_id,
                    teamsQueAns: queAnsTeams,
                    question: question,
                    checked: false
                }
            ]);
            localStorage.setItem("savedAnswers", JSON.stringify(savedAnswers));
            console.log(localStorage.getItem("savedAnswers"))
        });




        if (!socket || !gameId) return;
        // Wanneer de socket connecteert of reconnecteert
        const handleConnect = () => {
            socket.emit('joinGame', gameId);
        };
        socket.on('connect', handleConnect);

        return () => {
            socket.off("getModerator");
            socket.off("loadGame");
            socket.off("getSameRoomTeams");
            socket.off("getSameRoomTeams");
            socket.off("getStrategies");
            socket.off("get_question");
            socket.off('connect', handleConnect);


        };
    }, [ gameId,setGameActive]);

    useEffect(() => {

        const storedAnswers = localStorage.getItem("savedAnswers");
        if(!storedAnswers) return;
        const parsedAnswers= JSON.parse(storedAnswers);
        setSavedAnswers(parsedAnswers)

    }, [])


    if (loading) return (<div className="moderator-game">
        <p className={'loading'}>
            {t('Loading')} <span className="wait" aria-hidden="true"></span>
        </p>
    </div>);


    return (
        <div className="moderator-game">
            <header>
                {!gameActive ?
                    <button className={'start_game_button'} onClick={handleStartGame}>Start the Game</button> :
                    <button className={'start_game_button'} onClick={handleNextRound}>Next round</button>
                }
                <label>Room Code: </label>
                <h3>{game?.id}</h3>
                <label>Moderator: </label>
                <strong>{moderator?.name}</strong>

            </header>
            {msg &&
                <div className="message">
                    <strong>{msg}</strong>
                </div>
            }
            {<div className="game-board">
                {!waiting &&
                    <VennBoard isPlayer={false} currentTeam={null}/>}
                {show &&
                    <Popup setShow={setShow}/>
                }
            </div>}

            <section className="info-section">
                <div className="teams-result">

                    {teams && strategies &&
                        teams.map((team, teamIndex) => (
                            <div key={teamIndex} className="team-column">
                                <div className="team-title-container">
                                    <button className={` popup_button ${savedAnswers.map(a => a.team_id).includes(team.id) ? 'active': '' }`} disabled={!savedAnswers.map(a => a.team_id).includes(team.id)} onClick={() => openPopup(team.id)}>
                                        <img
                                        src={
                                            strategies.find((s) => s.id === team.strategy_id)?.icon || "default.icon"
                                        }
                                        alt="strategy icon"
                                    />
                                    </button>
                                    <h3>{team.name}</h3>

                                </div>
                                <div className="cell-container">
                                    {Array.from({length: game?.rounds ?? 0}).map((_, roundIndex) => (
                                        <div key={roundIndex} className="board-cell">
                                            <p>Round {roundIndex + 1}</p>
                                            <p>Punten:
                                                <strong> {team.points}</strong>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>

            </section>

            <Footer/>
        </div>
    );

}

export default ModeratorPanel;
