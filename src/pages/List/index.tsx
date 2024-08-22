import React, {useMemo} from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container, Content,Filters } from "./styles";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { useParams } from "react-router-dom";



const List: React.FC = () => {
    const params = useParams();
    const {type} = params;
    
    const title = useMemo(()=> {
       return type === "entry-balance"? {title:"Entradas", color: "#F7931B"}: {title:"Saídas", color:"#E44C4E"};
    }, [type])

    const months = [
        {value: 7, label:"Julho"},{value: 8, label:"Agosto"}
    ]
    const years = [
        {value: 2018, label: 2018},{value: 2019, label:2019}
    ]

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
                <HistoryFinanceCard
                    amount="R$ 99.99"
                    tagColor="#E44C4E"
                    title="Compras"
                    subTitle="10/10/2010"
                />
                <HistoryFinanceCard
                    amount="R$ 99.99"
                    tagColor="#E44C4E"
                    title="Compras"
                    subTitle="10/10/2010"
                />
                
            </Content>   
        </Container>
    </>
}

export default List