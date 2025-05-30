import * as React from "react";
import {useEffect} from "react";
import "react-dom"
import "./home.scss"
import Button from "../../components/Button/Button"
import Footer from "../../components/footer/Footer";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const Logo = "/Logo.png";


const Home: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handelCreateGameButton = () =>{
        navigate("/create-game");
    }
    const handelJoinGameButton = () =>{
        navigate("/join-game")
    }
    const handelSettingButton = () =>{
        navigate("/setting")
    }
    const handelLoadGameButton = () =>{
        navigate("/load-game")
    }


    useEffect(() => {

    }, []);


    return (
        <div className="Home-page">
            <header className="Home-header">
                <img src={Logo} alt="Logo"/>

            </header>
            <div className="Home-container">

                <div className="Home-buttons">
                    <Button text={t("createGame")} onClick={handelCreateGameButton}/>
                    <Button text={t("joinGame")} onClick={handelJoinGameButton}/>
                    {/*<Button text={t("settings")} onClick={handelSettingButton}/>
                    <Button text={t("loadGame")} onClick={handelLoadGameButton}/>*/}
                </div>

            </div>

            <Footer/>

        </div>
    );
};

export default Home;
