import React from "react"

import {Container, Header, LogoImg, Title, MenuContainer, MenuItemLink}from './styles'
import {MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp} from 'react-icons/md'
import logo from '../../assets/logo.svg'

const Aside: React.FC = ()=> {
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
                <MenuItemLink href="#">
                    <MdExitToApp/>
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    </>
}

export default  Aside