import * as React from "react";
import "./buttonStylee.scss"
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;


interface ButtonProps {
    text?: string;
    onClick?: () => void; // Optioneel
    type?: "button" | "submit" | "reset"; // Voeg type toe met standaardwaarde
    show?: boolean;
    loading?: boolean;

}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button" , show =false, loading =false}) => {
    return (
        <button type={type} onClick={onClick} className={"general"} style={{visibility: show ? "hidden" : "visible"}} >
            {!loading && text}
            {loading &&
            <p className={'button_loading'}>
                <span className="wait" aria-hidden="true"></span>
            </p>
            }
        </button>
    );
};

export default Button;