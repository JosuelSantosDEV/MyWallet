import styled from "styled-components";


export const Container =  styled.div`
    grid-area: AS;
    color:  ${props => props.theme.colors.white} ;
    background-color: ${props => props.theme.colors.secondary};
    padding-left: 20px;
    border-right: 1px solid ${props => props.theme.colors.gray};
`;
export const Header = styled.header`
    display: flex;
    align-items: center;
    height: 70px;
`;
export const LogoImg = styled.img`
    height: 40px;
    width: 40px;
`;
export const Title = styled.h2`
    color:  ${props => props.theme.colors.white};
    margin-left: 10px;
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
`;