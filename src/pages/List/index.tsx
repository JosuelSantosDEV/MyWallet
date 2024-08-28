import React, {useEffect, useMemo, useState} from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container, Content,Filters } from "./styles";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { useParams } from "react-router-dom";
import { gains } from "../../repositories/gains";
import { expenses } from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

interface Idata {
    id: number;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}



const List: React.FC = () => {

    const [data, setData] = useState<Idata[]>([]);

    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>("");

    const params = useParams();
    const {type} = params;

    const [selectedFrequency, setSelectedFrequency] = useState(["recorrente","eventual"])
    
    const title = useMemo(()=> {
       return type === "entry-balance"? {title:"Entradas", color: "#F7931B"}: {title:"Saídas", color:"#E44C4E"};
    }, [type])

    const listData =  useMemo(()=>{
        return type === "entry-balance"? gains : expenses;
    }, [])

    const months = [
        {value: 1, label:"Janeiro"}, {value: 2, label:"Fevereiro"},{value: 3, label:"Março"},{value: 4, label:"Abril"},
        {value: 5, label:"Maio"},{value: 6, label:"Junho"},
        {value: 7, label:"Julho"},{value: 8, label:"Agosto"},{value: 9, label:"Setembro"},{value: 10, label:"Outubro"},
        {value: 11, label:"Novembro"},{value: 12, label:"Dezembro"}
    ]
    // const years = [
    //     {value: 2018, label: 2018},{value: 2019, label:2019}, {value: 2020, label:2020}, {value: 2021, label:2021},
    //     {value: 2022, label:2022},{value: 2023, label:2023},{value: 2024, label:2024}
    // ]

    
    const years = useMemo(()=>{
        let uniqueYears: number[] = [];
        listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map((year)=>{
            return {value: year, label: year};
        });

    },[]);

    if(yearSelected === "")setYearSelected(String(years[0].value));

    function handleFrenquencyClick(frequency:string){
        //console.log("Frequency: "+frequency);
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);
        //console.log("AlreadySelected: "+alreadySelected);
        if(alreadySelected >= 0){
            const filtered = selectedFrequency.filter(item=>item !== frequency);
            //console.log("Filtered: "+filtered);
            setSelectedFrequency(filtered);
        } else {
            setSelectedFrequency((prev)=> [...prev, frequency]);
        }
        //console.log("SeledtedFrequency: "+selectedFrequency);
    }

    useEffect(()=>{
        const filteredData = listData.filter((item)=>{

            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
        })
    

        const formattedData = filteredData.map((item)=>{
            return {
                id: Math.floor(Math.random() * 100000),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)) ,
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E"
            }
        })
        setData(formattedData);
        console.log(monthSelected + "/"+ yearSelected);
    },[listData,monthSelected, yearSelected,data.length, selectedFrequency]);

    return <>
        <Container>
            <ContentHeader
                    title={title.title}
                    lineColor={title.color}
            >
                <SelectInput options={months} onChange={ event => setMonthSelected(event.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={event => setYearSelected(event.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>
            <Filters>
                <button 
                    type="button"
                    className= {`tag-filter tag-filter-recurrent ${selectedFrequency.includes("recorrente") && "tag-actived"}`}
                    onClick={()=> handleFrenquencyClick("recorrente")}
                >Recorrentes</button>
                <button 
                    type="button"
                    className={`tag-filter tag-filter-eventual ${selectedFrequency.includes("eventual") && "tag-actived"}`}
                    onClick={()=> handleFrenquencyClick("eventual")}
                >Eventuais</button>
            </Filters>
            <Content>
                {data.map((item) => {
                    
                    return <HistoryFinanceCard
                                key={item.id}
                                amount= {item.amountFormatted}
                                tagColor={item.tagColor}
                                title={item.description}
                                subTitle={item.dateFormatted}
                        />
                })}
            </Content>   
        </Container>
    </>
}

export default List