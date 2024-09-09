import styled, { css } from "styled-components";

interface IContainerProps{
    menuIsOpening: boolean;
}

interface IThemeToggleFooterProps {
    menuIsOpening: boolean;
}

export const Container =  styled.div<IContainerProps>`
    grid-area: AS;
    color:  ${props => props.theme.colors.white} ;
    background-color: ${props => props.theme.colors.secondary};
    padding-left: 20px;
    border-right: 1px solid ${props => props.theme.colors.gray};

    @media (max-width: 600px) {
        padding-left: 20px;
        position: fixed;
        z-index: 2;

        width: 200px;

        height: ${props => props.menuIsOpening? "100%" : "70px"};
        overflow: hidden;

        ${props => !props.menuIsOpening && css`
           border : none ;
           border-bottom: 1px solid ${props => props.theme.colors.gray};
        `};
    }
`;
export const Header = styled.header`
    display: flex;
    align-items: center;
    height: 70px;

    
`;

export const LogoImg = styled.img`
    height: 40px;
    width: 40px;

    @media (max-width: 600px) {
        display: none;
    }
`;

export const Title = styled.h2`
    color:  ${props => props.theme.colors.white};
    margin-left: 10px;

    @media (max-width: 600px) {
        width:100px;
        font-size:14px;
        margin-left: 5px;
        display: none;
    }

`;
export const MenuContainer = styled.nav`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;
export const MenuItemLink = styled.a`
    color:  ${props => props.theme.colors.info};
    text-decoration: none;
    transition: opacity .3s;
    font-size: 20px;
    display: flex;
    gap: 10px;
    align-items: center;

    &:hover {
        opacity: .7;
    }
    > svg {
        font-size: 30px;
    }
    @media (max-width: 600px) {
        
        font-size:18px; 
    }
`;
export const MenuItemButton = styled.button`
    font-size: 20px;
    color:  ${props => props.theme.colors.info};
    
    border: none;
    background: none;
    
    display: flex;
    gap: 10px;
    align-items: center;

    transition: opacity .3s;
    
    &:hover {
        opacity: .7;
    }
    > svg {
        font-size: 30px;
    }

    @media (max-width: 600px) {
        
        font-size:18px; 
    }
`;

export const ToggleMenu = styled.div`
    width:40px;
    height:40px;
    border-radius: 7px;
    font-size: 22px;

    display: none;

    background-color: ${props => props.theme.colors.warning};
    color: ${props => props.theme.colors.white};

    transition: opacity 0.3s;

    &:hover{
        opacity: 0.5;
    }

    @media (max-width: 600px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
`;

export const ThemeToggleFooter = styled.footer<IThemeToggleFooterProps>`
    display: none;
    position: absolute;
    bottom: 30px;

    @media (max-width: 470px) {
        display: ${props => props.menuIsOpening ? "flex" : "none"};
    }
`;