import styled, { keyframes } from "styled-components";

interface IContainerProps{
    color: string;
}

const animate = keyframes`
    0%{
        transform: translateY(-100px);
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


export const Container = styled.div<IContainerProps>`
    width: 32%;
    height: 150px;
    margin: 10px 0;

    background-color: ${props => props.color};
    color: ${props => props.theme.colors.white};

    border-radius: 5px;
    padding: 10px 20px;

    position:  relative;
    overflow: hidden;

    animation: ${animate} .5s ease-in;

    > img {
        height: 110%;
        position: absolute;
        top: -10px;
        right: -25px;
        opacity: .3;
    }
    > span{
        font-size: 18px;
        
        font-weight: 500;
    }
    > small{
        font-size: 12px;
        position: absolute;
        bottom: 10px;
    }

    @media (max-width: 770px) {
        > span{
            font-size: 14px;
        }
        > h1{
            word-wrap: break-word;
            font-size: 17px;

            > strong{
                display: inline-block;
                width: 100%;
            }
        }
    }
    @media (max-width: 420px) {
        
        width: 100%;

        > span {
            font-size: 18px;
        }
        > h1{
            font-size: 22px;
        }
        > h1 strong {
            display: inline;
            width: 100%;
            font-size: 18px;
        }
    }
`;