import React, { useMemo } from "react"

import {Container, Profile, Welcome, UserName}from './styles'

import emojis from "../../utils/emojis" // Array de emojis
import Toggle from "../Toggle"

const MainHeader: React.FC = ()=> {
    const emoji = useMemo(()=>{
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    }, [])
    
    return <>
        <Container>
            <Toggle/>
            <Profile>
                <Welcome>Olá, &#128513;</Welcome>
                <UserName>Josuel Santos</UserName>
            </Profile>
        </Container>
    </>
}

export default  MainHeader