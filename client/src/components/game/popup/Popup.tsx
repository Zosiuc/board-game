import './popup.scss'
import React, { useState} from "react";
import {useGameContext} from "../../../context/GameContext";
import {socket} from "../../../socket/client";

interface Props {
    setShow: (show: boolean) => void;
}

const Popup: React.FC<Props> = ({setShow}) => {

    const {teams,teamId} = useGameContext();
    const {teamsQueAns} = useGameContext();
    const {question} = useGameContext();
    const {savedAnswers, setSavedAnswers} = useGameContext();
    const [points, setPoints] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");



    const judgeAnswer = (teamsQueAns_id: number|null, score: number, feedback: string) => {
        console.log(`this  from judge: ${teamsQueAns_id}, ${score}, ${feedback}`);
        if (!teamsQueAns) return alert('teamsQueAns is leeg!')
        teamsQueAns["score"] = score;
        teamsQueAns["feedback"] = feedback;
        socket.emit("judge_answer", teamsQueAns);
        socket.on("answer_feedback", () => {
            console.log("answer_feedback done" );
            const updatedAnswerIndex = savedAnswers.findIndex(a => a.teamsQueAns_id === teamsQueAns_id);
            setSavedAnswers((prev) => prev.splice(updatedAnswerIndex, 1));

        })
        const updatedAnswerIndex = savedAnswers.findIndex(a => a.teamsQueAns_id === teamsQueAns.id);

        setSavedAnswers((prev) => {
            const updated = [...prev];
            updated[updatedAnswerIndex]={
                ...updated[updatedAnswerIndex],
                checked: true
            }
            return updated;
        });

        setShow(false);

    }

    return (

        <div className={'answers-section'}>
            <h3>Ingezonden antwoord van {teams?.find((t) => t.id === teamId)?.name}</h3>
            <div className="answers">
                <div className={'answers'}>
                    <div className="answer-container">
                        <p className="question-block">
                            <strong>{question?.content}</strong>
                        </p>
                        <p className="answer-block">
                            {teamsQueAns?.answer}
                        </p>
                    </div>
                    <form className={'judge-form'}
                          onSubmit={(event) => {
                              event.preventDefault();
                              if (!teamsQueAns) return alert('no team quw ans found !')
                              judgeAnswer(teamsQueAns?.id, points, feedback)
                          }}>

                            <textarea className={'feedback-text'} placeholder={`${teamsQueAns?.answer}`}
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
        </div>
    )
}
export default Popup;