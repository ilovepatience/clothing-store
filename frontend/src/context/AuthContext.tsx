import { createContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    email?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);

    const login = async (username: string, password: string) => {
        const response = await axios.post(`${API_URL}/api/auth/login/`, {
            username,
            password
        });

        const { access } = response.data;
        localStorage.setItem('token', access);
        setToken(access);
        setUser({ id: 1, username });
    };

    const register = async (username: string, email: string, password: string) => {
        await axios.post(`${API_URL}/api/auth/register/`, {
            username,
            email,
            password
        });
        await login(username, password);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            register,
            logout,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};
export {AuthContext};