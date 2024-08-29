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
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(0);
    const [selectedFilterFrequency, setSelectedFilterFrequency] = useState(["recorrente","eventual"])

    const params = useParams();
    const movimentType = params.type;


    const months = useMemo(()=>{
        return [
            {value: 1, label:"Janeiro"}, {value: 2, label:"Fevereiro"},{value: 3, label:"Março"},{value: 4, label:"Abril"},
            {value: 5, label:"Maio"},{value: 6, label:"Junho"},
            {value: 7, label:"Julho"},{value: 8, label:"Agosto"},{value: 9, label:"Setembro"},{value: 10, label:"Outubro"},
            {value: 11, label:"Novembro"},{value: 12, label:"Dezembro"}
        ]
    }, []);

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

    const pageData = useMemo(()=>{
        if(movimentType === "entry-balance"){
            return {
                title: "Entradas",
                lineColor: "#4E41F0",
                listData: gains
            }
        }else{
            return {
                title: "Saidas",
                lineColor: "#E44C4E",
                listData: expenses
            }
        }
    },[movimentType])
    
    const years = useMemo(()=>{
        let uniqueYears: number[] = [];
        pageData.listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map((year)=>{
            return {value: year, label: year};
        });

    },[pageData.listData]).sort((a,b)=>{
        if(a.value < b.value) return 1;
        return -1
    });


    if(yearSelected === 0)setYearSelected(years[0].value);

    function handleFrenquencyClick(frequency:string){
        //console.log("Frequency: "+frequency);
        const alreadySelected = selectedFilterFrequency.findIndex(item => item === frequency);
        //console.log("AlreadySelected: "+alreadySelected);
        if(alreadySelected >= 0){
            const filtered = selectedFilterFrequency.filter(item=>item !== frequency);
            //console.log("Filtered: "+filtered);
            setSelectedFilterFrequency(filtered);
        } else {
            setSelectedFilterFrequency((prev)=> [...prev, frequency]);
        }
        //console.log("SeledtedFrequency: "+selectedFilterFrequency);
    }

    useEffect(()=>{
        
        const filteredData = pageData.listData.filter((item)=>{

            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && selectedFilterFrequency.includes(item.frequency);
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
    },[pageData.listData,monthSelected, yearSelected,data.length, selectedFilterFrequency]);

    return <>
        <Container>
            <ContentHeader
                    title={pageData.title}
                    lineColor={pageData.lineColor}
            >
                <SelectInput options={months} onChange={ event => handleMonthSelected(event.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={event => handleYearSelected(event.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>
            <Filters>
                <button 
                    type="button"
                    className= {`tag-filter tag-filter-recurrent ${selectedFilterFrequency.includes("recorrente") && "tag-actived"}`}
                    onClick={()=> handleFrenquencyClick("recorrente")}
                >Recorrentes</button>
                <button 
                    type="button"
                    className={`tag-filter tag-filter-eventual ${selectedFilterFrequency.includes("eventual") && "tag-actived"}`}
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