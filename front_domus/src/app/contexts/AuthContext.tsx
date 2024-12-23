'use client'
import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import nookies, { destroyCookie, setCookie } from 'nookies';



interface AuthContextData {
    isAuthenticated: boolean;
    signIn: (dados: Login.EntidadeLogin) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = nookies.get(null, 'attossoluctions.token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Função de login
    async function signIn({ usuario, senha }: Login.EntidadeLogin) {
        try {
            

            const resposta = await axios.post('http://localhost:8080/api/logar', { usuario, senha });

            const expiraEm = resposta.data.expiraEm; 


            setIsAuthenticated(true);

            // Definir o cookie com o token
            setCookie(undefined, 'attossoluctions.token', resposta.data.tokenDeAcesso, {
                maxAge: expiraEm, 
                path: '/',
            });

            // Redirecionar para a página de dashboard
            router.push('/dashboard');

        } catch (error) {
            setIsAuthenticated(false);
            destroyCookie(null, 'attossoluctions.token'); // Remover cookie inválido
            router.push('/login'); // Redirecionar para login
            throw new Error('Falha na autenticação.');
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
