import React, { useEffect, useState} from 'react';
import "./team-panel.scss"
import Footer from "../../../components/footer/Footer";

import {getStrategiesListener} from "../../../socket/strategyListeners";
import { getTeamListener} from "../../../socket/teamListeners";
import {useParams} from "react-router-dom";
import VennBoard from "../../../components/game/vennBoard/VennBoard";
import {socket} from "../../../socket/client";
import {useGameContext} from "../../../context/GameContext";
import {useTranslation} from "react-i18next";
import {getGameModeratorListener, getModeratorListener} from "../../../socket/moderatorListeners";

const TeamPanel: React.FC = () => {

    const {t} = useTranslation();
    const {teamId} = useParams();

    const {setModerator} = useGameContext();
    const { msg,setMsg, setGameActive} = useGameContext();
    const {gameId} = useGameContext();
    const {team, setTeam} = useGameContext();
    const {roundNumber} = useGameContext();
    const {question, setQuestion} = useGameContext()

    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [teamStrategy, setTeamStrategy] = useState<{
        id: number,
        category_id: number,
        name: string,
        icon: string,
        color: string
    } | null>(null);


    const loadModerator = async () => {
        try{
            const gameId = sessionStorage.getItem("game_id")
            if (!gameId) return setMsg("No game id found.");
            const mod = await getGameModeratorListener(gameId);
            if (!mod) return setMsg("no game id found.");
            setModerator(mod);
            setMsg(`game master: ${mod?.name} for Game: ${mod?.game_id}`)
            setLoading(false);

        }catch (err) {
            setLoading(false);
            setMsg(`${err}`);

        }
    }

    const loadTeam = async () => {
        try {
            const team = await getTeamListener(teamId ?? "");
            if (!team) return alert("No team found.");
            console.log(team.strategy_id);
            setTeam(team);
            setLoading(false);

        } catch (err) {
            console.log(err);
            return;
        }
    }
    const loadStrategy = async () => {
        const strategies = await getStrategiesListener();
        const team = await getTeamListener(teamId ?? "");

        const str =strategies?.find((strategy: { id: any; }) => strategy.id === team?.strategy_id);
        if (!str) return alert("No strategies found.");
        setTeamStrategy(str)
        setLoading(false);
    }


    const handleSubmitAnswer = () => {
        socket.emit("submit_answer", gameId, teamId, question?.id  , answer, roundNumber)
    }

    useEffect(() => {
        socket.on("gameStarted", (msg) => {
            setMsg(msg);
        })
        socket.emit("loadGame", sessionStorage.getItem("game_id"));
        socket.on("game", (game) => {
            if (game.status === "active" ) setGameActive(true)
            else setGameActive(false);
            setLoading(false);
        });

        loadTeam().then(r =>{
            loadStrategy().then(()=> loadModerator())
        });

        socket.emit("reconnecting");

        socket.on("question", (myQuestion) => {
            setQuestion(myQuestion);
        });
        return () => {
            socket.off("question");
            socket.off("reconnecting")
        }

    }, []);

    useEffect(() => {
        if (!socket || !gameId) return;

        // Wanneer de socket connecteert of reconnecteert
        const handleConnect = () => {
            socket.emit('joinGame', gameId);
        };

        socket.on('connect', handleConnect);


        // Belangrijk: bij unmount opruimen
        return () => {
            socket.off('connect', handleConnect);
        };
    }, [socket, gameId]);



    if (loading) return (<div className="team-game">
        <p className={'loading'}>
            {t('Loading')} <span className="wait" aria-hidden="true"></span>
        </p>
    </div>);
    return (
        <div className="team-game">
            {msg &&
                <div className="message">
                    <strong>{msg}</strong>
                </div>
            }
            <div className="boardGrid-container">
            <VennBoard isPlayer={true} currentTeam={team} />
            </div>
            {question&&<div className="question_pop" >
                <div className="question">
                    <strong>{question.content}</strong>
                </div>
                <div className="answers">
                    <form className={"answer_form"} onSubmit={e => handleSubmitAnswer()}>
                        <textarea placeholder={"geef jouw antwoord hier"} onChange={ (e) => setAnswer(e.target.value)} />
                        <button type={"submit"}>Beantwoord</button>
                    </form>

                </div>
            </div>}
            <article className="team-info">
                <img src={teamStrategy?.icon} alt="Strategy Icon"/>
                <p>
                    <strong>{team?.id}</strong>: {team?.name}
                </p>
                <p>
                    <strong>Score</strong>: {team?.points}
                </p>
                <p>
                    <strong>Strategy</strong>: {teamStrategy?.name}
                </p>
                <p>
                    <strong>Game </strong>: {team?.game_id}
                </p>
                <label></label>
            </article>
            <Footer/>
        </div>
    )
}
export default TeamPanel;