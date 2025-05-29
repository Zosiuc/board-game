import * as React from "react";
import "./buttonStylee.scss"


interface ButtonProps {
    text: string;
    onClick?: () => void; // Optioneel
    type?: "button" | "submit" | "reset"; // Voeg type toe met standaardwaarde
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button" }) => {
    return (
        <button type={type} onClick={onClick} className="general">
            {text}
        </button>
    );
};

export default Button;