import React, { Children, ReactNode } from "react"

import {Container}from './styles'

import MainHeader from "../MainHeader"
import Content from "../Content"
import Aside from "../Aside"

const Layout: React.FC<{children:React.ReactNode}> = ({children})=> {
    return <>
        <Container>
            <MainHeader/>
            <Aside/>
            <Content>
                {children}
            </Content>
        </Container>
    </>
}

export default  Layout