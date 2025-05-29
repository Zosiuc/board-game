import React, {useEffect, useState} from "react";
import "./join-game.scss";
import Footer from "../../../components/footer/Footer.tsx";
import {useNavigate} from "react-router-dom";
import Button from "../../../components/Button/Button.tsx";
import {addTeamListener} from "../../../socket/teamListeners.ts";
import {getGameListener} from "../../../socket/gameListeners.ts";
import {getStrategiesListener} from "../../../socket/strategyListeners.ts";

import { useTranslation } from "react-i18next";
import {useGameContext} from "../../../context/GameContext.tsx";
const Logo =  "/Logo.png";


const JoinGame = () => {
    const { t } = useTranslation();
    const {setContextGameId,setContextTeamId} = useGameContext();
    const [gameId, setGameId] = useState("");
    const [teamId, setTeamId] = useState<string>("");
    const [teamName, setTeamName] = useState<string>("");
    const [strategy, setStrategy] = useState<string>("lunar");
    const [strategies, setStrategies] = useState<{id:number,category_id:number,name:string,icon:string,color:string}[]|null>(null);
    const navigate = useNavigate();

    // Functie om een random team ID te genereren (standaard lengte 6)
    const generateTeamId = (length: number = 6) => {
        const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
        const numbers = "1234567890"
        let result = '';
        const randomLetterIndex1 = Math.floor(Math.random() * letters.length);
        const randomLetterIndex2 = Math.floor(Math.random() * letters.length);
        const randomNumberIndex1 = Math.floor(Math.random() * numbers.length);
        const randomNumberIndex2 = Math.floor(Math.random() * numbers.length);
        const randomNumberIndex3 = Math.floor(Math.random() * numbers.length);
        const randomNumberIndex4 = Math.floor(Math.random() * numbers.length);
        result += letters.charAt(randomLetterIndex1) + letters.charAt(randomLetterIndex2)+"-"+numbers.charAt(randomNumberIndex1)+numbers.charAt(randomNumberIndex2)+numbers.charAt(randomNumberIndex3)+numbers.charAt(randomNumberIndex4);

        return setTeamId(result);
    };
    const handelGetStrategies = async () => {
        try {
            const response:
                {id:number,category_id:number,name:string,icon:string,color:string,isChosen:boolean}[]|null
                = await getStrategiesListener();

            if (!response ) {
                alert("Geen strategies gevonden");
                return;
            }
            const filteredStrategies = response.filter(e => !e.isChosen)
            console.log("QQQ",response);
            setStrategies(filteredStrategies);

        } catch (err) {
            console.error(`Fout bij het ophalen van categorieën: ${err}`);
            alert(`Fout bij het ophalen van categorieën: ${err}`);
        }
    };

    const handleJoinGame = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            if (!gameId || !teamName || !strategy) return alert(`Not valid data`);
            const game = await getGameListener(gameId);
            if (!game)  return;
            sessionStorage.setItem("game_id", gameId)
            const team = await addTeamListener(teamId, teamName, strategy, gameId );
            sessionStorage.setItem("team_id", JSON.stringify(team.id));
            setContextTeamId(teamId);
            setContextGameId(gameId);


            navigate(`/game/${team?.id}`)
        }catch (error) {
            console.error(error);
            alert(`No game found with room id ${gameId}`)
        }

    };

    useEffect(() => {
        generateTeamId();
        handelGetStrategies();

    }, [])

    return (
        <div className="join-game">
            <img className="logo" src={Logo} alt="Logo"/>
            <form
                className="join-game-form"
                onSubmit={handleJoinGame}>
                <label>{t('yourTeamId')}<h4>{teamId}</h4></label>
                <input
                    className="join-game-input"
                    type="text"
                    placeholder={t('roomCode')}
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    required
                />
                <input
                    className="join-game-input"
                    type="text"
                    placeholder={t('teamName')}
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                />
                <select
                    className="join-game-input"
                    onChange={(e) => setStrategy(e.target.value)}
                    required
                    value={strategy}
                >
                    <option value="" >
                        {t('chooseStrategy')}
                    </option>

                    {strategies?.map((strategy1,index) => (
                        <option key={index}  value={strategy1.name}>
                             {strategy1.name}</option>
                    ))}
                </select>

                <Button text={t('joinGame')} type="submit"/>
            </form>
            <Footer/>
        </div>
    );
};

export default JoinGame;
