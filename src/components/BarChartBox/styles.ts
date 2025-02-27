import styled, { keyframes } from "styled-components";

interface ILegendProps {
    color: string
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
    width: 48%;
    min-height: 260px;
    margin: 10px 0;
    border-radius: 7px;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    display: flex;

    animation: ${animate} .5s ease-in;

    @media (max-width: 1200px) {
        display: flex;
        flex-direction:column;
        width: 100%;
        height: auto;
    }

`;

export const SideLeft = styled.aside`
    flex: 1;
    padding: 30px 20px;
    > h2{
        margin-bottom: 10px;
        padding-left: 16px;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;

    height: 175px;
    padding-right: 15px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        width: 10px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.colors.tertiary};
    }


    @media (max-width: 1200px) {
        display: flex;
        
        height: auto;
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    padding-left: 16px;
    
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
        font-size: 20px;
    }

    @media (max-width: 1200px) {
        > div{
            background-color: ${props => props.color};
            width: 40px;
            height: 40px;
            border-radius: 5px;

            font-size: 12px;
            line-height: 40px;
            text-align: center;
        }
        > span{
            margin-left: 5px;
            font-size: 16px;
        }
    }

`;

export const SideRight = styled.main`
    flex: 1;
    min-height: 150px;

    display: flex;
    justify-content: center;

    padding-top: 35px;
    padding-bottom: 15px;
`;


