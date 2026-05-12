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
        setLoading(false); // pour indiquer que le chargement est terminé
    }, []);

    const login = async (email, password) => {
        const { token } = await api.post('/login', { email, password });
        localStorage.setItem('token', token); // pour stocker le token de l'utilisateur connecté
        const userData = { email }; // pour stocker l'email de l'utilisateur connecté
        localStorage.setItem('user', JSON.stringify(userData)); // pour stocker l'email de l'utilisateur connecté
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
};