import React from "react";

import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import Layout from "../components/Layout";


const AppRoutes: React.FC = () => (
    <Layout>
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard"  element={<Dashboard/>}/>
                <Route path="/list/:type" element={<List/>}/>
                <Route path="*" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    </Layout>
    
);

export default AppRoutes;