import * as React from "react";
import "./buttonStylee.scss"


interface ButtonProps {
    text: string;
    onClick?: () => void; // Optioneel
    type?: "button" | "submit" | "reset"; // Voeg type toe met standaardwaarde
    show?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button" , show =false}) => {
    return (
        <button type={type} onClick={onClick} className="general" style={{visibility: show ? "hidden": "visible" }}>
            {text}
        </button>
    );
};

export default Button;