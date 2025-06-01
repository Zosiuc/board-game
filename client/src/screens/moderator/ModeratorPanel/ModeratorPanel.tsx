import React, {useEffect, useState} from 'react';
import "./moderator-panel.scss";
import Footer from "../../../components/footer/Footer";
import VennBoard from "../../../components/game/vennBoard/VennBoard";
import {socket} from "../../../socket/client";
import {useTranslation} from "react-i18next";
import {useGameContext} from "../../../context/GameContext";



const ModeratorPanel = () => {
    const {t} = useTranslation();
    const {gameActive, setGameActive, contextGameId,setMsg, msg} = useGameContext();
    const [moderator, setModerator] = useState<{
        id: string,
        name: string,
        game_id: string,
        created_at: string
    } | null>(null);

    const [game, setGame] = useState<{
        id: string,
        category_id: number,
        rounds: number,
        teams_count: number,
        status: string,
        lang: string,
        master_socket: string,
        created_at: string
    } | null>(null);

    const [teams, setTeams] = useState<{
        id: string,
        name: string,
        strategy_id: number,
        game_id: string,
        socket_id: string,
        points: number,
        color: string,
        current_tiled: string
        created_at: string
    }[] | null>(null);

    const [strategies, setStrategies] = useState<{
        id: number,
        category_id: number,
        name: string,
        icon: string,
        color: string
    }[] | null>(null);

    const [queAntTeams, setQueAntTeams] = useState<{
        id: number,
        game_id: string,
        team_id: string,
        question_id: number,
        moderator_id: number,
        answer: string,
        score: number | null,
        feedback: string,
        round_number: number,
        created_at: string,
        updated_at: string
    } | null>(null);
    const [question, setQuestion] = useState<{
        id: number,
        category_id: number,
        strategy_id: number,
        lang: string,
        content: string
    } | null>(null);
    const [points, setPoints] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");
    const [waiting, setWaiting] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const game_id = sessionStorage.getItem("game_id");
        socket.emit("reconnecting")
        if (!game_id) return console.error('gameId not found');
        const moderator_id = sessionStorage.getItem("moderator_id");
        if (!moderator_id) return console.error('moderatorId not found');

        socket.emit("getModerator", moderator_id);
        socket.on("moderator", (moderator) => {
            setModerator(moderator);
        });

        socket.emit("loadGame", game_id)
        socket.on("game", (game) => {
            setGame(game)
            setLoading(false);
            setWaiting(false);
        });
    


        socket.emit("getStrategies")
        socket.on("strategies", (data) => {
            if (data.error) return alert(data.error);
            setStrategies(data.strategies);
        });


        socket.emit("getSameRoomTeams", game_id);
        socket.on("sameRoomTeams", (teams) => {
            if (!teams) return
            setTeams(teams);
            setGameActive(true)
        });

        socket.off("new_answer").once("new_answer", (queAnsTeams, question) => {
            setQueAntTeams(queAnsTeams);
            setQuestion(question);

        })

        if (!socket || !contextGameId) return;
        // Wanneer de socket connecteert of reconnecteert
        const handleConnect = () => {
            socket.emit('joinGame', contextGameId);
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
    }, [socket, contextGameId]);

    const judgeAnswer = (queAntTeams_id: number, score: number, feedback: string) => {
        if (queAntTeams){
        queAntTeams["score"] = score;
        queAntTeams["feedback"] = feedback;
        socket.emit("judge_answer", queAntTeams);
        }
    }
    const handleStartGame = async () => {

        socket.emit('startGame', contextGameId)
    }

    const  handleNextRound = () => {

    }

    if (loading) return (<div className="moderator-game">
        <p className={'loading'}>
            {t('Loading')} <span className="wait" aria-hidden="true"></span>
        </p>
    </div>);


    return (
        <div className="moderator-game">
            <header>
                {!gameActive &&
                    <button className={'start_game_button'} onClick={handleStartGame}>Start the Game</button> ||
                    <button className={'start_game_button'} onClick={handleNextRound}>Next round</button>
                }
                <label>Room Code: </label>
                <h3>{game?.id}</h3>
                <label>Moderator: </label>
                <strong>{moderator?.name}</strong>-
                <h3>{moderator?.id}</h3>
            </header>
            {msg &&
                <div className="message">
                    <strong>{msg}</strong>
                </div>
            }
            {<div className="game-board">
                {waiting ? <h1 className="waiting-text">Waiting for Teams....</h1> :
                    <VennBoard isPlayer={false} currentTeam={null} />}
                {queAntTeams && <div className="answers-section">
                    <h3>Ingezonden antwoord van {teams?.find(t => t.id === queAntTeams.team_id)?.name}</h3>
                    <div className={'answers'}>
                        <div className="answer-container">
                            <p className="question-block">
                                <strong>{question?.content}</strong>
                            </p>
                            <p className="answer-block">
                                {queAntTeams.answer}
                            </p>
                        </div>
                        <form className={'judge-form'}
                              onSubmit={(e) => judgeAnswer(queAntTeams.question_id, points, feedback)}>

                            <textarea className={'feedback-text'} placeholder={'geef jouw feedback'}
                                      onChange={(e) => setFeedback(e.target.value)}/>
                            <div className={"points-container"}>
                                <input
                                    id={"0"}
                                    className={'peer'}
                                    name="points"
                                    value={0}
                                    type={'radio'}
                                    hidden={true}
                                    onChange={(e) => setPoints(parseInt(e.target.value))}
                                /><label
                                htmlFor="0"
                                className={"points"}
                            >0</label>
                                <input
                                    id={"5"}
                                    className={'peer'}
                                    name="points"
                                    value={5}
                                    type={'radio'}
                                    hidden={true}
                                    onChange={(e) => setPoints(parseInt(e.target.value))}
                                /><label
                                htmlFor="5"
                                className={"points"}
                            >5</label>
                                <input
                                    id={"10"}
                                    className={'peer'}
                                    name="points"
                                    value={10}
                                    type={'radio'}
                                    hidden={true}
                                    onChange={(e) => setPoints(parseInt(e.target.value))}
                                /><label
                                htmlFor="10"
                                className={"points"}
                            >10</label>
                                <input
                                    id={"15"}
                                    className={'peer'}
                                    name="points"
                                    value={15}
                                    type={'radio'}
                                    hidden={true}
                                    onChange={(e) => setPoints(parseInt(e.target.value))}
                                /><label
                                htmlFor="15"
                                className={"points"}
                            >15</label>
                                <input
                                    id={"20"}
                                    className={'peer'}
                                    name="points"
                                    value={20}
                                    type={'radio'}
                                    hidden={true}
                                    onChange={(e) => setPoints(parseInt(e.target.value))}
                                /><label
                                htmlFor="20"
                                className={"points "}
                            >20</label>
                            </div>
                            <button
                                className={"sub-button"}
                                type={'submit'}>
                                submit
                            </button>
                        </form>
                    </div>
                </div>
                }
            </div>}

            <section className="info-section">
                <div className="teams-result">

                    {teams && strategies &&
                        teams.map((team, teamIndex) => (
                            <div key={teamIndex} className="team-column">
                                <div className="team-title-container">

                                    <img
                                        src={
                                            strategies.find((s) => s.id === team.strategy_id)?.icon || "default.icon"
                                        }
                                        alt="strategy icon"
                                    />
                                    <h3>{team.name}</h3>

                                </div>
                                <div className="cell-container">
                                    {Array.from({length: game?.rounds ?? 0}).map((_, roundIndex) => (
                                        <div key={roundIndex} className="board-cell">
                                            <p>Round {roundIndex + 1}</p>
                                            <p>Punten:
                                                <strong>{team.points}</strong>
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
