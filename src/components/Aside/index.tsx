import React, { useState } from "react"

import {Container, Header, LogoImg, Title, MenuContainer,
     MenuItemLink, MenuItemButton, ToggleMenu, ThemeToggleFooter
}from './styles'
import {MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdClose, MdMenu} from 'react-icons/md'
import logo from '../../assets/logo.svg'
import { useAuth } from "../../hooks/auth"
import { useTheme } from "../../hooks/theme"
import Toggle from "../Toggle"

const Aside: React.FC = ()=> {

    const {signOut} = useAuth();
    const {toggleTheme, theme} =  useTheme();

    const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === "dark"? true: false);

    const handleToggleMenu = ()=> {
        setToggleMenuIsOpen(!toggleMenuIsOpen);
    };

    const handleChangeTheme = ()=>{
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    return <>
        <Container menuIsOpening={toggleMenuIsOpen}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpen ?  <MdClose/> : <MdMenu/>}
                </ToggleMenu>
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
            <ThemeToggleFooter menuIsOpening={toggleMenuIsOpen}>
                <Toggle
                    checked={darkTheme}
                    labelLeft="Light"
                    labelRight="Dark"
                    onChange={handleChangeTheme}
                />
            </ThemeToggleFooter>
        </Container>
    </>
}

export default  Aside