import React from "react";
import {BrowserRouter,Route, Routes } from "react-router-dom";
import Signin from "../pages/Signin";

const AuthRoutes: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route index element={<Signin/>} path="/" />
            <Route path="*" element={<Signin/>}/>
        </Routes>
    </BrowserRouter>
);

export default AuthRoutes;