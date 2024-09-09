import styled, { keyframes } from "styled-components";

const animate = keyframes`
    0%{
        transform: translateX(-100px);
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
    height: 260px;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius:7px ;
    margin: 10px 0;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    animation: ${animate} .5s ease-in;

    > header img {
        width: 35px;
        margin-left: 10px;
    }

    > header p {
        font-size: 18px;
    }

    @media (max-width: 770px) {
        width: 100%;
        > header {
            font-size: 20px;

            img {
                height: 45px;
                width: 45px;
            }
        }
        > header p, > footer span {
            font-size: 16px;
        }
    }
    @media (max-width: 440px) {
        width: 100%;
        > header {
            font-size: 16px;
            
            img {
                height: 40px;
                width: 40px;
            }
        }
        > header p {   
            font-size: 16px;
        }
         > footer span {
            font-size: 14px;
        }
    }
`;