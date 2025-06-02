import React, {useEffect, useState} from "react";
import "./join-game.scss";
import Footer from "../../../components/footer/Footer";
import {useNavigate} from "react-router-dom";
import Button from "../../../components/Button/Button";
import {addTeamListener, getRoomTeamsListener} from "../../../socket/teamListeners";
import {getGameListener} from "../../../socket/gameListeners";
import {getStrategiesListener} from "../../../socket/strategyListeners";

import { useTranslation } from "react-i18next";
import {useGameContext} from "../../../context/GameContext";
const Logo =  "/Logo.png";


const JoinGame = () => {
    const { t } = useTranslation();
    const {setContextGameId,setContextTeamId} = useGameContext();
    const [strategies, setStrategies] = useState <{id: number,
        category_id: number,
        name: string,
        icon: string,
        color: string
}[] | null>()
    const {contextTeams} = useGameContext();
    const [gameId, setGameId] = useState("");
    const [teamId, setTeamId] = useState<string>("");
    const [teamName, setTeamName] = useState<string>("");
    const [strategy, setStrategy] = useState<string>("lunar");
    const [loading, setLoading] = useState(true);
    const [gameAvailable, setGameAvailable] = useState<boolean>(false);
    const [availableStrategies, setAvailableStrategies] = useState<{
        id: number,
        category_id: number,
        name: string,
        icon: string,
        color: string
    }[] | null>()
    const [inputValue, setInputValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [fout, setFout] = useState<string>('');
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
            setLoading(true);
            const response:
                {id:number,category_id:number,name:string,icon:string,color:string}[]|null
                = await getStrategiesListener();

            if (!response ) {
                alert("Geen strategies gevonden");
                return;
            }
            const filteredStrategies = response.filter(s => s.name !== "Chance" && s.name !== "Megatrends" && s.name !== "Sales management");
            setStrategies(filteredStrategies);
            setAvailableStrategies(filteredStrategies);
            setLoading(false);

        } catch (err) {
            console.error(`Fout bij het ophalen van categorieën: ${err}`);
            alert(`Fout bij het ophalen van categorieën: ${err}`);
        }
    };

    const handleJoinGame = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            setLoading(true)
            if (!gameId || !teamName || !strategy) return alert(`All fields required! ${gameId}, ${teamName}, ${strategy}`);
            sessionStorage.setItem("game_id", gameId)
            const team = await addTeamListener(teamId, teamName, strategy, gameId );
            sessionStorage.setItem("team_id", JSON.stringify(team.id));
            setContextTeamId(teamId);
            setContextGameId(gameId);


            navigate(`/game/${team?.id}`)
        }catch (error) {
            setLoading(false)
            console.error(error);
            alert(`No game found with room id ${gameId}`)
        }

    };

    const checkStrategyInUse = async (game_id:string) => {
        setLoading(true);
        const allTeams = await getRoomTeamsListener(game_id);
        if (allTeams.length <= 0) {
            handelGetStrategies()
            return setLoading(false);
        }
        const strategiesIdInUse = allTeams?.map((team) => team.strategy_id);
        const availableStrategies = strategies?.filter(strategy => !strategiesIdInUse.includes(strategy.id));
        setAvailableStrategies(availableStrategies)
        setLoading(false)

    }

    const checkGameId = async (id:string) => {
        try {
            const game = await getGameListener(id);
            if (!game) return setGameAvailable(false)
            const allTeams = await getRoomTeamsListener(id);
            if (game.teams_count <= allTeams.length) return setFout(`Room ${id} is full`);
            setGameId(id);
            setGameAvailable(true)
            checkStrategyInUse(id).then(() => setGameAvailable(true));


        }catch (error) {
            console.error(error);
            setFout(`No game found with room id ${id}`);
            setGameAvailable(false)
            document.getElementById("game_id")?.classList.add("fout");

        }
    }
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 500); // 500ms wachten

        return () => {
            clearTimeout(handler); // Reset timer als gebruiker weer typt
        };
    }, [inputValue]);

    useEffect(() => {
        if (debouncedValue) {
            checkGameId(debouncedValue);
        }
    }, [debouncedValue]);

    useEffect(() => {
        generateTeamId();
        handelGetStrategies().then(()=> {
            setLoading(false)
        });

    }, [])

    if (loading) return (<div className="join-game">
        <p className={'loading'}>
            {t('Loading')} <span className="wait" aria-hidden="true"></span>
        </p>
    </div>);
    return (
        <div className="join-game">
            <img className="logo" src={Logo} alt="Logo"/>
            <form
                className="join-game-form"
                onSubmit={handleJoinGame}>
                <label>{t('yourTeamId')}<h4>{teamId}</h4></label>
                <input
                    id={"game_id"}
                    className="join-game-input"
                    type="text"
                    placeholder={t('roomCode')}
                    value={inputValue}
                    onChange={ (e) =>{
                        document.getElementById("game_id")?.classList.remove("fout");
                        setFout('')
                         setInputValue(e.target.value)
                        }}
                    required
                />
                {fout &&
                <strong className={"fout_massage"}>{fout}</strong>
                }
                <input
                    className="join-game-input"
                    type="text"
                    placeholder={t('teamName')}
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                />
                {gameAvailable &&
                <select
                    className="join-game-input"
                    onChange={(e) => setStrategy(e.target.value)}
                    required
                    value={strategy}
                >
                    <option value="" >
                        {t('chooseStrategy')}
                    </option>

                    {availableStrategies?.map((strategy1,index) => (
                        <option key={index}  value={strategy1.name}>
                             {strategy1.name}</option>
                    ))}
                </select>}

                <Button text={t('joinGame')} type="submit" show={!gameAvailable}/>
            </form>
            <Footer/>
        </div>
    );
};

export default JoinGame;
