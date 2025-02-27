import React from "react";
import { Container, Legend, LegendContainer, SideLeft, SideRight } from "./styles";
import {PieChart, Pie, Cell, ResponsiveContainer} from "recharts"

interface IPieChartProps {
    data: {
        name: string;
        value: number;
        percent: number;
        color: string;
    }[]
}

const PieChartBox: React.FC<IPieChartProps>= ({data})=> (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
            <LegendContainer>
                {
                    data.map((indicator)=>(
                        <Legend key={Math.floor(Math.random() * 1000)} color={indicator.color}>
                            <div>{indicator.percent}%</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    ))
                }
                
            </LegendContainer>
        </SideLeft>
        <SideRight>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="percent">
                        {
                            data.map((indicator)=>(
                                <Cell key={indicator.name} fill={indicator.color}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
);

export default PieChartBox;