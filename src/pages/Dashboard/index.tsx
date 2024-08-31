import React, { useMemo, useState } from "react";
import { Container, Content } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { gains } from "../../repositories/gains";
import { expenses } from "../../repositories/expenses";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";

import { IMessageBoxProps } from "../../components/MessageBox";

const Dashboard: React.FC = () => {
    
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>();

    
    function handleMonthSelected(month: string){
        try{
            const parseMonth = Number(month)
            setMonthSelected(parseMonth);
        }catch(error){
            console.log(error)
        }
    }
    function handleYearSelected(year: string){
        try{
            const parseYear = Number(year)
            setYearSelected(parseYear);
        }catch(error){
            console.log(error)
        }
    }
    const years = useMemo(()=>{
        let uniqueYears: number[] = [];
        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map((year)=>{
            return {value: year, label: year};
        });

    },[]).sort((a,b)=>{
        if(a.value < b.value) return 1;
        return -1
    });

    const months = useMemo(()=>{
        return [
            {value: 1, label:"Janeiro"}, {value: 2, label:"Fevereiro"},{value: 3, label:"Março"},{value: 4, label:"Abril"},
            {value: 5, label:"Maio"},{value: 6, label:"Junho"},
            {value: 7, label:"Julho"},{value: 8, label:"Agosto"},{value: 9, label:"Setembro"},{value: 10, label:"Outubro"},
            {value: 11, label:"Novembro"},{value: 12, label:"Dezembro"}
        ]
    }, []);

    const totalExpenses = useMemo(()=>{
        let total: number = 0;
        expenses.forEach((item)=>{
            const date = new Date(item.date);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try {
                    total+= Number(item.amount);
                } catch {
                    throw new Error("Erro ao converter amount para somara ao total - Dashboard/index");
                }
            }
        })
        return  total;
    },[monthSelected, yearSelected])

    const totalGains = useMemo(()=>{
        let total: number = 0;
        gains.forEach((item)=>{
            const date = new Date(item.date);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try {
                    total+= Number(item.amount);
                } catch {
                    throw new Error("Erro ao converter amount para somara ao total - Dashboard/index");
                }
            }
        })
        return  total;
    },[monthSelected, yearSelected])

    const totalBalance = useMemo(()=>{
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses])


    const message = useMemo<IMessageBoxProps>(()=>{
        if(totalBalance > 0){
            return {
                title: "Muito bem!!!",
                description: "Sua carteira está positiva!",
                footerText: "Parabens! continui assim, considere investir seu saldo!!!",
                icon: "happy"
            }
        }else if(totalBalance == 0){
            return {
                title: "Ufaaa!!!",
                description: "Foi por pouco!",
                footerText: "Vc ficou por um fiu de ficar sem saldo!",
                icon: "grinning"
            }
        } else {
            return {
                title: "Que pena!!!",
                description: "Sua carteira está negativa!",
                footerText: "Tente não gastar todo o seu saldo, pense bem andes de gastar qualquer centavo!",
                icon: "sad"
            }
        }
        
    }, [totalBalance])

    return <> 
        <Container>
            <ContentHeader
                title="Dashboard"
                lineColor="#F7931B"
            >
                <SelectInput options={months} onChange={ event => handleMonthSelected(event.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={event => handleYearSelected(event.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>
            <Content>
                <WalletBox
                    title="Saldo"
                    amount={totalBalance}
                    footerLabel="Atualizado com base nas entradas e saidas!"
                    color="#4E41F0"
                    icon="dollar"
                />
                <WalletBox
                    title="Entradas"
                    amount={totalGains}
                    footerLabel="Atualizado com base nas entradas e saidas!"
                    color="#F7931B"
                    icon="arrowUp"
                />
                <WalletBox
                    title="Saidas"
                    amount={totalExpenses}
                    footerLabel="Atualizado com base nas entradas e saidas!"
                    color="#E44C4E"
                    icon="arrowDown"
                />
                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />
                
            </Content>  
        </Container>
    </>
}

export default Dashboard