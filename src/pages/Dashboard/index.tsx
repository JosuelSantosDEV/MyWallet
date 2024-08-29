import React, { useMemo, useState } from "react";
import { Container, Content } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { gains } from "../../repositories/gains";
import { expenses } from "../../repositories/expenses";
import WalletBox from "../../components/WalletBox";

const Dashboard: React.FC = () => {
    
    const [monthSelected, setMonthSelected] = useState<number>();
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
                    amount={150.00}
                    footerLabel="Atualizado com base nas entradas e saidas!"
                    color="#4E41F0"
                    icon="dollar"
                />
                <WalletBox
                    title="Entradas"
                    amount={5000.00}
                    footerLabel="Atualizado com base nas entradas e saidas!"
                    color="#F7931B"
                    icon="arrowUp"
                />
                <WalletBox
                    title="Saidas"
                    amount={4850.00}
                    footerLabel="Atualizado com base nas entradas e saidas!"
                    color="#E44C4E"
                    icon="arrowDown"
                />
            </Content>
        </Container>
    </>
}

export default Dashboard