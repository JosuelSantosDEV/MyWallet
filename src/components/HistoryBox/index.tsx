import React from "react";
import {Container, Header, Legend, LegendContainer } from "./styles";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip
} from "recharts"
import formatCurrency from "../../utils/formatCurrency";

interface IHistoryBoxProps {
    data: {
        month: string,
        amountEntry: number,
        amountOutput: number
    }[];
    lineColorAmountEntry: string;
    lineColorAmountOutput: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
    data,
    lineColorAmountEntry,
    lineColorAmountOutput
})=>(
    <Container>
        <Header>
            <h2>Histórico de saldo</h2>
            <LegendContainer>
                <Legend color={lineColorAmountEntry}>
                    <div></div>
                    <span>Entrada</span>
                </Legend>
                <Legend color={lineColorAmountOutput}>
                    <div></div>
                    <span>Saída</span>
                </Legend>
            </LegendContainer>
        </Header>
        <ResponsiveContainer>
            <LineChart data={data} margin={{top: 20, right: 20, left: 20, bottom: 20}}>
                <CartesianGrid 
                    strokeDasharray="3 3"
                    stroke="#cecece"
                />
                <XAxis
                    dataKey="month"
                    stroke="#cecece"
                />
                <Tooltip formatter={(value)=>(formatCurrency(Number(value)))}/>
                <Line
                    type="monotone"
                    dataKey="amountOutput"
                    name="Saída"
                    stroke={lineColorAmountOutput}
                    strokeWidth={5}
                    dot={{r:5}}
                    activeDot={{r:8}}
                />
                <Line
                    type="monotone"
                    dataKey="amountEntry"
                    name="Entradas"
                    stroke={lineColorAmountEntry}
                    strokeWidth={5}
                    dot={{r:5}}
                    activeDot={{r:8}}
                />
            </LineChart>
        </ResponsiveContainer>
    </Container>
)

export default HistoryBox;