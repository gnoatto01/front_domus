'use client'
import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import nookies, { destroyCookie, setCookie } from 'nookies';
import { jwtDecode } from 'jwt-decode';




interface AuthContextData {
    isAuthenticated: boolean;
    signIn: (dados: Login.LoginEntity) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    useEffect(() => {
        const token = nookies.get(null, 'attossoluctions.token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    async function signIn({ username, password }: Login.LoginEntity) {
        try {


            const response = await axios.post(`${baseUrl}/login`, { username, password });

            //decodifiquei o token
            const decoded = jwtDecode(response.data.accessToken);

            //verifiquei se existe data de expiracao
            if (decoded.exp) {
                //setei a data de expiracao
                const expiresIn = decoded.exp;
                setIsAuthenticated(true);

                setCookie(undefined, 'attossoluctions.token', response.data.accessToken, {
                    maxAge: expiresIn,
                    path: '/',
                });


                // Redirecionar para a página home
                router.push('/home');
            } else {
                throw new Error('Invalid token, exp not present.');
            }

        } catch (error) {
            setIsAuthenticated(false);
            destroyCookie(null, 'attossoluctions.token'); // Remover cookie inválido
            router.push('/login'); // Redirecionar para login
            throw new Error('Falha na autenticação.' + error);
        }
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
