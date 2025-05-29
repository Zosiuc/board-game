import React, { useEffect, useState} from 'react';
import "./team-panel.scss"
import Footer from "../../../components/footer/Footer.tsx";

import {getStrategiesListener} from "../../../socket/strategyListeners.ts";
import { getTeamListener} from "../../../socket/teamListeners.ts";
import {useParams} from "react-router-dom";
import VennBoard from "../../../components/game/vennBoard/VennBoard.tsx";
import {socket} from "../../../socket/client.ts";
import {useGameContext} from "../../../context/GameContext.tsx";

const TeamPanel: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const {contextGameId} = useGameContext();
    const [team, setTeam] = useState<{
        id: string,
        name: string,
        strategy_id: number,
        game_id: string,
        points: number,
        color:string,
        current_tileId: string,
        created_at: string
    }|null>(null)
    const [teamStrategy, setTeamStrategy] = useState<{
        id: number,
        category_id: number,
        name: string,
        icon: string,
        color: string
    } | null>(null);
    const {teamId} = useParams();

    const [roundNumber, setRoundNumber] = useState<number>(0);
    const [question, setQuestion] = useState<{id:number,category_id:number,strategy_id:number,lang:string,content:string}|null>(null);
    const [answer, setAnswer] = useState<string | null>(null);
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

        const str =strategies?.find(strategy => strategy.id === team?.strategy_id);
        if (!str) return alert("No strategies found.");
        setTeamStrategy(str)
        setLoading(false);
    }

    const handleSubmitAnswer = () => {
        socket.emit("submit_answer", contextGameId, teamId, question?.id  , answer, roundNumber)
    }

    useEffect(() => {

        setRoundNumber(0)
        loadTeam().then(r => loadStrategy());

        socket.on("question", (myQuestion) => {
            setQuestion(myQuestion);
        });
        return () => {
            socket.off("team")
            socket.off("question")
        }

    }, []);



    if (loading) return (<div className="team-game"><h1>Loading...</h1></div>);
    return (
        <div className="team-game">
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