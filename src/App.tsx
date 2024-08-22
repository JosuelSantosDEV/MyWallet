import React from "react";

import GlobalStyles from "./styles/GlobalStyles";

import Layout from "./components/Layout";
import {ThemeProvider} from 'styled-components'
import dark from "./styles/themes/dark"; // Tema dark
import light from "./styles/themes/light"; // Tema light
import Dashboard from "./pages/Dashboard";
import List from "./pages/List";
import Routes from "./routes";

const App: React.FC= () => {
    return (
        <ThemeProvider theme={dark}>
            <GlobalStyles/>
            <Routes/>
        </ThemeProvider>
    )
}

export default App;