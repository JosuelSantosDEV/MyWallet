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

    const params = useParams();
    const {type} = params;
    
    const title = useMemo(()=> {
       return type === "entry-balance"? {title:"Entradas", color: "#F7931B"}: {title:"Saídas", color:"#E44C4E"};
    }, [type])

    const listData =  useMemo(()=>{
        return type === "entry-balance"? gains : expenses;
    }, [])

    const months = [
        {value: 7, label:"Julho"},{value: 8, label:"Agosto"}
    ]
    const years = [
        {value: 2018, label: 2018},{value: 2019, label:2019}
    ]

    useEffect(()=>{
        const response = listData.map((item)=>{
            return {
                id: Math.floor(Math.random() * 100000),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)) ,
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E"
            }
        })
        setData(response);
        console.log(listData);
    },[]);

    return <>
        <Container>
            <ContentHeader
                    title={title.title}
                    lineColor={title.color}
            >
                <SelectInput options={months}/>
                <SelectInput options={years}/>
            </ContentHeader>
            <Filters>
                <button 
                    type="button"
                    className="tag-filter tag-filter-recurrent"
                >Recorrentes</button>
                <button 
                    type="button"
                    className="tag-filter tag-filter-eventual"
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