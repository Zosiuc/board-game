import React, {useEffect, useState} from "react";
import "./create-game.scss";
import Footer from "../../../components/footer/Footer";
import Button from "components/Button/Button";
import {addGameListener} from "../../../socket/gameListeners";
import {addModeratorListener} from "../../../socket/moderatorListeners";
import {getCategoriesListener} from "../../../socket/categoryListeners";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useGameContext} from "../../../context/GameContext";



// Functie om een random room code te genereren (standaard lengte 6)
const generateRoomCode = (length: number = 3): string => {
    const characters = 'AB34CD32EFGH65IJKL2345MNOP34QRS35TUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    result+="-"
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
};

const CreateGame: React.FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const { gameId, setGameId} = useGameContext();
    const {  setModeratorId} = useGameContext();

    const [moderatorName, setModeratorName] = useState<string>("");
    const [rounds, setRounds] = useState<number>(2);
    const [totalTeams, setTotalTeams] = useState<number>(2);
    const [categories, setCategories] = useState<{id:number,name:string}[] | null>(null);
    const [category, setCategory] = useState<string>("general");
    const [loading, setLoading] = useState<boolean|undefined>(true);

    const handelGetCategories = async ():Promise<void> => {
        try {
            const response = await getCategoriesListener();
            if (!response || response.length === 0) {
                setLoading(false);
                alert("Geen categorieën gevonden");
                return;
            }
            console.log(response);
            setCategories(response);
            return;

        } catch (err) {
            console.error(`Fout bij het ophalen van categorieën: ${err}`);
            return alert(`Fout bij het ophalen van categorieën: ${err}`);
        }
    };

    const handelCreateGame = async (event: { preventDefault: () => void; }) => {
        try {
            event.preventDefault();
            setLoading(true);
            if (!gameId) return alert("No game id found")
            const lang = document.documentElement.lang;
            const responseGameId = await addGameListener(gameId,category,rounds,totalTeams,lang);
            if (!responseGameId) {
                console.error(new Error("Game Could Not Add."));
                return;
            }
            setGameId(responseGameId);
            sessionStorage.setItem("game_id",responseGameId);
            console.log(`Game ${responseGameId} is gemaakt!`);


            const moderatorIdR = await addModeratorListener(moderatorName, responseGameId);
            if (!moderatorIdR) {
                console.error(new Error("Moderator Did Not Add."));
                return;
            }
            console.log(`Moderator ${moderatorIdR} is toegevoegd`);
            sessionStorage.setItem("moderator_id", String(moderatorIdR));
            setModeratorId(moderatorIdR);

            navigate(`/moderator/${responseGameId}`);

        } catch (err) {
            console.error("Fout bij het creëren van de game:", err);
        }
    }


    useEffect(() => {
        setGameId(generateRoomCode());
        handelGetCategories().then(()=> setLoading(false));

    }, []);


   /* if (loading) return (<div className="creatGame-page">
        <p className={'loading'}>
        {t('Loading')} <span className="wait" aria-hidden="true"></span>
        </p>
    </div>);*/


    return (
        <div className="creatGame-page">
            <h1>{t("createGame")}</h1>
            <div className="container">
                <div className="room-code">
                    <label>{t("roomCode")}:</label>
                    <h4>{gameId}</h4>

                </div>
                <form
                    className="create-game-form"
                    onSubmit={handelCreateGame}
                >
                    <div className="moderator-name">
                        <h5>{t("moderatorName")}</h5>
                        <textarea
                            value={moderatorName}
                            placeholder={t("enterName")}
                            required={true}
                            onChange={e => setModeratorName(e.target.value)}/>
                    </div>
                    <div className="player-number">
                        <h5>{t("totalTeams")}</h5>
                        <select
                            className={"select"}
                            value={totalTeams}
                            required={true}
                            onChange={(e) => setTotalTeams(parseInt(e.target.value))}>
                            <option value={2}>2 {t("teams")}</option>
                            <option value={3}>3 {t("teams")}</option>
                            <option value={4}>4 {t("teams")}</option>
                            <option value={5}>5 {t("teams")}</option>
                            <option value={6}>6 {t("teams")}</option>
                        </select>
                    </div>
                    <div className="game-rounds">
                        <h5>{t("rounds")}</h5>
                        <select
                            className={"select"}
                            value={rounds}
                            required={true}
                            onChange={(e) => setRounds(parseInt(e.target.value))}>
                            <option value={2}>2 {t("rounds")}</option>
                            <option value={3}>3 {t("rounds")}</option>
                            <option value={4}>4 {t("rounds")}</option>
                            <option value={5}>5 {t("rounds")}</option>
                            <option value={6}>6 {t("rounds")}</option>
                        </select>
                    </div>
                    <div className="game-category">
                        <h5>{t("selectQuestionCategory")}</h5>
                        <select
                            required={true}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            {categories && categories.map((category1, index) =>
                                <option key={index} value={category1.name}>
                                    {category1.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <Button loading={loading} text={t("createGame")} type="submit"  />
                </form>

            </div>
            <Footer/>
        </div>
    )
}
export default CreateGame;