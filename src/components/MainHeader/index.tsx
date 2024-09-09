import React, { useMemo, useState } from "react"

import {Container, Profile, Welcome, UserName}from './styles'

import emojis from "../../utils/emojis" // Array de emojis

import { useTheme } from "../../hooks/theme"
import Toggle from "../Toggle"

const MainHeader: React.FC = ()=> {

    const {toggleTheme, theme} = useTheme();

    const [darkTheme, setDarkTheme] = useState(() => theme.title === "dark"? true: false);

    const handleChangeTheme = ()=>{
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    const emoji = useMemo(()=>{
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    }, [])
    
    return <>
        <Container>
            <Toggle
                checked={darkTheme}
                labelLeft="Light"
                labelRight="Dark"
                onChange={handleChangeTheme}
            />
            <Profile>
                <Welcome>Olá, &#128513;</Welcome>
                <UserName>Josuel Santos</UserName>
            </Profile>
        </Container>
    </>
}

export default  MainHeader