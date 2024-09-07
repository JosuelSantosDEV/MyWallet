import React, { useState } from "react";

import { 
    Container,
    Logo,
    Form,
    FormTitle,
} from "./styles";

import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/auth";

const Signin: React.FC = () => {

    const [email, setEmail]= useState<string>("");
    const [password, setPassword]= useState<string>("");

    const {signIn} = useAuth();

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Logo MyWallet" />
                <h2>My Wallet</h2>
            </Logo>
            <Form onSubmit={()=>{signIn(email, password)}}>
                <FormTitle>
                    Entrar
                </FormTitle>
                <Input
                    required
                    type="email"
                    placeholder="E-mail"
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <Input
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e)=> setPassword(e.target.value)}
                />

                <Button type="submit">Acessar</Button>
            </Form>
        </Container>
    )
}

export default Signin