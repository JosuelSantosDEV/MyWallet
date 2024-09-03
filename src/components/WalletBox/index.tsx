import React from "react"
import { Container } from "./styles";
import CountUp from "react-countup";

import dollarImg from "../../assets/dollar.svg"
import arrowUpImg from "../../assets/arrow-up.svg"
import arrowDownImg from "../../assets/arrow-down.svg"


interface IWalletBoxProps{
    title: string;
    amount: number;
    footerLabel: string;
    icon: "dollar" | "arrowUp" | "arrowDown";
    color: string;
}
function handleIconSelected(icon: "dollar" | "arrowUp" | "arrowDown"){
    if(icon === "dollar") return dollarImg;
    if(icon === "arrowUp") return arrowUpImg;
    return arrowDownImg;
}
const WalletBox: React.FC<IWalletBoxProps>= ({title, amount, footerLabel, icon,color})=>(
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp 
                    end={amount}
                    prefix="R$ "
                    separator="."
                    decimal=","
                    decimals={2}
                    preserveValue   
                ></CountUp>
            </h1>
            <small>{footerLabel}</small>
            <img src={handleIconSelected(icon)} alt={title} />
        </Container>
)


export default WalletBox;