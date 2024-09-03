import React from "react"
import { Container } from "./styles"

import happyImg from "../../assets/happy.svg"
import sadImg from "../../assets/sad.svg"
import grinningImg from "../../assets/grinning.svg"
import opsImg from "../../assets/Ops.png"

export interface IMessageBoxProps{
    title: string;
    description: string;
    footerText: string;
    icon: "happy" | "sad" | "grinning"| "ops";
}

const MessageBox: React.FC<IMessageBoxProps> = ({title, description, footerText, icon})=>{
    
    const handleIconSelected = (icon: string)=>{
        switch(icon){
            case "happy":
                return happyImg;
            case "sad":
                return sadImg;
            case "grinning":
                return grinningImg;
            case "ops":
                return opsImg;
        }
    }
    
    return (
        <Container>
            <header>
                <h1>
                    {title}
                    <img src={handleIconSelected(icon)} alt={title} />
                </h1>
                <p>
                    {description}
                </p>
            </header>
            <footer>
                <span>
                    {footerText}
                </span>
            </footer>
        </Container>
    )
}

export default MessageBox;