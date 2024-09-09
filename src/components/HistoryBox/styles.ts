import styled, { keyframes } from "styled-components";

interface ILegendProps {
    color: string;
}

const animate = keyframes`
    0%{
        transform: translateY(100px);
        opacity: 0;

    }
    50%{
        opacity: 0.3;
    }
    100%{
        transform: translateX(0);
        opacity: 1;
    }
`;

export const Container = styled.div`
    width: 100%;
    height: 350px;
    margin: 10px 0;
    border-radius: 7px;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    animation: ${animate} .5s ease-in;

`; 
export const ChartContainer = styled.div`

    flex: 1;
    height: 260px;

`;
export const Header = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;

    > h2{
        margin-bottom: 10px;
        padding-left: 16px;
    }
    @media (max-width: 1200px){
        flex-direction: column;
    }
`;
export const LegendContainer = styled.ul`
    list-style: none;

    display: flex;

    padding-right: 16px;
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    margin-left: 16px;
    
    > div{
        background-color: ${props => props.color};
        width: 50px;
        height: 50px;
        border-radius: 5px;

        font-size: 16px;
        line-height: 50px;
        text-align: center;
    }
    > span{
        margin-left: 8px;
    }

    @media (max-width: 1250px){
        > div {
            width: 30px;
            height: 30px;
        }
    }
`;