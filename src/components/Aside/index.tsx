import React from "react"

import {Container, Header, LogoImg, Title, MenuContainer, MenuItemLink, MenuItemButton}from './styles'
import {MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp} from 'react-icons/md'
import logo from '../../assets/logo.svg'
import { useAuth } from "../../hooks/auth"

const Aside: React.FC = ()=> {

    const {signOut} = useAuth();

    return <>
        <Container>
            <Header>
                <LogoImg src={logo} alt="Logo My-Wallet"/>
                <Title>My-Wallet</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink href="/dashboard">
                    <MdDashboard/>       
                    Dashboard
                </MenuItemLink>
                <MenuItemLink href="/list/entry-balance">
                    <MdArrowDownward/>
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="/list/exit-balance">
                    <MdArrowUpward/>
                    Saídas
                </MenuItemLink>
                <MenuItemButton onClick={signOut}>
                    <MdExitToApp/>
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    </>
}

export default  Aside