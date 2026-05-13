import { useState, createContext, useEffect, useContext } from "react";
import { api } from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                setUser({});
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { token } = await api.post('/login', { email, password });
        localStorage.setItem('token', token);
        const userData = { email };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const register = async (email, password) => {
        try {
            const result = await api.post('/register', { email, password });
        } catch (error) {
            console.log("L'utilisateur existe déjà ==> " + error);
            return error;
        }
        const token = result.token;
        localStorage.setItem('token', token);
        const userData = { email };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
       
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}