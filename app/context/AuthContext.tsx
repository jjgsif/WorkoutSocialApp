import { createContext, useContext, useEffect, useState } from "react";

import axios from 'axios';

import * as SecureStore from "expo-secure-store";

interface AuthProps{
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (email: string, password: string) => Promise<any>; 
    onLogin?: (email: string, password: string) => Promise<any>; 
    onLogout?: () => Promise<any>; 
}

const TOKEN_KEY = 'my-jwt';

export const API_URL = 'http://10.0.0.120:3000';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () =>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{token: string | null, authenticated: boolean | null , user_id: number | null}>({token: null, authenticated : null, user_id: null});

    useEffect( () => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const id = Number(await SecureStore.getItemAsync("user_id"));

            if(token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                //console.log(token)

                setAuthState({
                    token: token,
                    authenticated: true,
                    user_id: id
                });
            }
        }
        loadToken();
    }, [])

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/users/tokens/sign_up`, {email, password});
        } catch (e){
            return {error: true, msg: (e as any).response.data.status};
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/users/tokens/sign_in`, {email, password});
            //console.log(result.data.resource_owner.id);
            setAuthState({
                token: result.data.token,
                authenticated: true,
                user_id: 1
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            await SecureStore.setItemAsync('user_id', String(result.data.resource_owner.id));
            //console.log("id" + String(result.data.resource_owner.id));
            
            return result;
            
        } catch (e){
            return {error: true, msg: (e as any).response.data.status};
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        //await SecureStore.deleteItemAsync("user_id");

        axios.defaults.headers.common['Authorization'] = "";

        setAuthState({
            token: null,
            authenticated: false,
            user_id: 1
        });
    }
    const value = {
        onRegister: register,
        onLogin: login, 
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}