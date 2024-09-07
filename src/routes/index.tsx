import React from "react";

import AppRoutes from "./app.routes";
import { useAuth } from "../hooks/auth";
import AuthRoutes from "./auth.routes";
import { BrowserRouter } from "react-router-dom";

const Routes: React.FC = ()=>{

    const {logged} = useAuth();

    return (

            <>
                {logged ? <AppRoutes/>: <AuthRoutes/>}
            </>
            
    )
}

export default  Routes;