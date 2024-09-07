import React, {createContext, useContext, useState} from "react";

interface IAuthProps{
    logged: boolean;
    signIn: (email: string, password: string)=>void;
    signOut: ()=>void;
}

const KEY_LOCALSTORE_ISLOGGED = "@MyWallet:ISLOGGED_LOCALSTORE_KEY";

const AuthContext = createContext<IAuthProps>({} as IAuthProps);

const getIsLoggedSavedLocalStore= ()=>{
    try{
        const themeSaved = localStorage.getItem(KEY_LOCALSTORE_ISLOGGED);
        return !!themeSaved;
     }catch{
         throw new Error("Erro ao recuperar tema do localstore");
     } 
};

const AuthProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [logged, setLogged] = useState<boolean>(getIsLoggedSavedLocalStore);

    const signIn = (email: string, password:string)=>{
        if(email !== "" && password !== ""){
            localStorage.setItem(KEY_LOCALSTORE_ISLOGGED, "true");
            setLogged(true);
        }else {
            alert("Senha ou usuário inválido!!!");
        }
    };

    const signOut = ()=>{
        localStorage.removeItem(KEY_LOCALSTORE_ISLOGGED);
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): IAuthProps{
    return useContext(AuthContext);
};

export {AuthProvider, useAuth};