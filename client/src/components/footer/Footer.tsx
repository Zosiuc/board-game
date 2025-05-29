// @ts-ignore
import Da from "../../assets/flags/den_flag.png";
// @ts-ignore
import Nl from "../../assets/flags/nl_flag.png";
// @ts-ignore
import Uk from "../../assets/flags/uk_flag.png";
import "./footerSylee.scss"
import * as React from "react";
import {useTranslation} from "react-i18next";
import {socket} from "../../socket/client.ts";


function Footer() {

    const {i18n} = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
            .then(() => socket.emit("changeLanguage", lang))
            .catch(err => console.log(err.message));
    };

    return (
        <nav className="Footer-nav">
            <div>
                <button onClick={() => changeLanguage("da")}><img src={Da} alt="DE flag"/></button>
                <button onClick={() => changeLanguage("nl")}><img src={Nl} alt="NL flag"/></button>
                <button onClick={() => changeLanguage("en")}><img src={Uk} alt="UK flag"/></button>
            </div>
        </nav>
    )
}

export default Footer;