import React, { useMemo, useState } from "react";
import { Container, Content } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { gains } from "../../repositories/gains";
import { expenses } from "../../repositories/expenses";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";

import { IMessageBoxProps } from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

const Dashboard: React.FC = () => {
    
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(0);

    
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

    if(yearSelected === 0)setYearSelected(years[0].value);

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

    const relationExpensesGains = useMemo(()=>{
        const total = totalExpenses + totalGains;


        let percentExpenses = 0;
        let percentGains = 0;
        // verificasion case total == 0, for the aplication not break
        if(total !== 0){
            percentExpenses = Number(((totalExpenses/total) * 100).toFixed(1));
            percentGains = Number(((totalGains/total) * 100).toFixed(1));
        };

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: percentGains,
                color: "#F7931B"
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: percentExpenses,
                color: "#E44C4E"
            }
        ];

        return data;

    },[totalExpenses, totalGains]);

    const HistoryData = useMemo(()=>{
        
        return months.map((_, month)=>{

                let amountEntry = 0;

                gains.forEach((gain)=>{
                    const date = new Date(gain.date);
                    const gainMonth = date.getMonth();
                    const gainYear = date.getFullYear();

                    if(month === gainMonth && gainYear === yearSelected) {
                        try{
                            amountEntry += Number(gain.amount);
                        }catch{
                            throw new Error("Erro ao converter amount em HistoryData");
                        }
                    }
                });
                let amountOutput = 0;

                expenses.forEach((expense)=>{
                    const date = new Date(expense.date);
                    const expenseMonth = date.getMonth();
                    const expenseYear = date.getFullYear();

                    if(month === expenseMonth && expenseYear === yearSelected) {
                        try{
                            amountOutput += Number(expense.amount);
                        }catch{
                            throw new Error("Erro ao converter amount em HistoryData");
                        }
                    }
                })

                return {
                    monthNumber: month,
                    month: months[month].label.substring(0,3),
                    amountEntry,
                    amountOutput
                }
        }).filter((item)=>{
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            
            return ((yearSelected === currentYear && item.monthNumber <= currentMonth) ||  (yearSelected < currentYear))
        });
    },[ yearSelected, totalExpenses, totalGains]);

    const relationExpensevesRecurrentEventual = useMemo(()=>{

        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense)=>{
            const date = new Date(expense.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return ( month === monthSelected && year === yearSelected)
        }).forEach((expense)=>{
            if(expense.frequency === "recorrente") {
                try{
                    return amountRecurrent += Number(expense.amount);
                }catch{
                    throw new Error("Houve um erro ao converter expense.amount para number em relationExpensevesRecurrentEventual");
                }
            }
            if(expense.frequency === "eventual") {
                try{
                    return amountEventual += Number(expense.amount);
                }catch{
                    throw new Error("Houve um erro ao converter expense.amount para number em relationExpensevesRecurrentEventual");
                }
            }
        });

        const total = amountEventual + amountRecurrent;
        let percentRecurrent = 0;
        let percentEventual = 0;
        // verificasion case total == 0, for the aplication not break
        if(total !== 0){
            percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
            percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
        }
        return [{
            name: "Recorrentes",
            amount: amountRecurrent,
            percent: percentRecurrent,
            color: "#F7931B"
        },
        {
            name: "Eventuais",
            amount: amountEventual,
            percent: percentEventual,
            color: "#E44C4E"
        }
        ]

    },[monthSelected, yearSelected]);

    const relationGainsRecurrentEventual = useMemo(()=>{

        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gain)=>{
            const date = new Date(gain.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return ( month === monthSelected && year === yearSelected)
        }).forEach((gain)=>{
            if(gain.frequency === "recorrente") {
                try{
                    return amountRecurrent += Number(gain.amount);
                }catch{
                    throw new Error("Houve um erro ao converter gain.amount para number em relationGainsRecurrentEventual");
                }
            }
            if(gain.frequency === "eventual") {
                try{
                    return amountEventual += Number(gain.amount);
                }catch{
                    throw new Error("Houve um erro ao converter gain.amount para number em relationGainsRecurrentEventual");
                }
            }
        });

        const total = amountEventual + amountRecurrent;
        let percentRecurrent = 0;
        let percentEventual = 0;
        // verificasion case total == 0, for the aplication not break
        if(total !== 0){
            percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
            percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
        }

        return [{
            name: "Recorrentes",
            amount: amountRecurrent,
            percent: percentRecurrent,
            color: "#F7931B"
        },
        {
            name: "Eventuais",
            amount: amountEventual,
            percent: percentEventual,
            color: "#E44C4E"
        }
        ]

    },[monthSelected, yearSelected]);

    const message = useMemo<IMessageBoxProps>(()=>{
        if(totalBalance > 0){
            return {
                title: "Muito bem!!!",
                description: "Sua carteira está positiva!",
                footerText: "Parabens! continui assim, considere investir seu saldo!!!",
                icon: "happy"
            }
        }else if(totalExpenses === 0 && totalGains === 0){
            return {
                title: "Op`s!!!",
                description: "Não há registros esse mês!",
                footerText: "Vc não inseriu nenhuma quantia esse mês, nem retirou valor algum!",
                icon: "ops"
            }
        } else if(totalBalance === 0){
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
        
    }, [totalBalance, totalExpenses, totalGains])

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

                <PieChartBox 
                    data={relationExpensesGains}
                />

                <HistoryBox
                    data={HistoryData}
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"
                />
                
                <BarChartBox
                    data={relationExpensevesRecurrentEventual}
                    title="Saídas"
                />
                <BarChartBox
                    data={relationGainsRecurrentEventual}
                    title="Entradas"
                />

            </Content>  
        </Container>
    </>
}

export default Dashboard