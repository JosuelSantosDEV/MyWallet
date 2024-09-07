
import React, { createContext, useContext, useState } from "react";
import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface IThemeContextProps {
    toggleTheme: ()=> void;
    theme: ITheme;
};

interface ITheme {
    title: string;
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;

        white:string;
        black:string;
        gray: string;

        success: string;
        info: string;
        warning: string;
    };
};

const KEY_LOCALSTORE_THEME = "@MyWallet:LOCALSTORE_THEME_KEY";

const ThemeContext = createContext<IThemeContextProps>({} as IThemeContextProps);

const getThemeSavedLocalStore= ()=>{
    try{
        const themeSaved = localStorage.getItem(KEY_LOCALSTORE_THEME);
        if(themeSaved){
         return JSON.parse(themeSaved);
        }else return dark;
     }catch{
         throw new Error("Erro ao recuperar tema do localstore");
     } 
};

const ThemeProvider: React.FC<{children:React.ReactNode}> = ({children})=>{

    const [theme, setTheme] = useState<ITheme>(getThemeSavedLocalStore);

    

    const toggleTheme = ()=> {
        if(theme.title === "dark"){
            setTheme(light);  
            try{
                localStorage.setItem(KEY_LOCALSTORE_THEME, JSON.stringify(light));
            }catch{
                throw new Error("Erro ao gravar tema no localstore");
            }  
        } else {
            setTheme(dark);
            try{
                localStorage.setItem(KEY_LOCALSTORE_THEME, JSON.stringify(dark));
            }catch{
                throw new Error("Erro ao gravar tema no localstore");
            }
        }
    };

    return (
        <ThemeContext.Provider value={{toggleTheme, theme}}>
            {children}
        </ThemeContext.Provider>
    );
};

function useTheme(): IThemeContextProps {
    const context = useContext(ThemeContext);
    return context;
}

export { ThemeProvider, useTheme};