import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Todoform from "../components/Todoform";
import TodoList from "../components/TodoList";
import { api } from "../lib/api";

function HomePage() {
    const { user, logout } = useAuth();
    const [taches, setTaches] = useState([]);
    const [texte, setTexte] = useState('');

    useEffect(() => {
        chargerTaches();
    }, []);

    const chargerTaches = async () => {
        const taches = await api.get('/taches');
        setTaches(taches);
    };

    const ajouterTache = async () => {
        if (texte.trim()) {
            const newTache = await api.post('/taches', { texte });
            setTaches([...taches, newTache]);
            setTexte('');
        }
    };

    const toggleTache = async (id, termine) => {
        const updatedTache = await api.put(`/taches/${id}`, { termine });
        setTaches(taches.map(tache => tache.id === id ? updatedTache : tache));
    };

    const supprimerTache = async (id) => {
        await api.delete(`/taches/${id}`);
        setTaches(taches.filter(tache => tache.id !== id));
    };

    return (
        <div>
            <h1>HomePage</h1>
            <button onClick={logout}>Logout</button>
            <Todoform listTaches={taches} setListTaches={setTaches} ajouterTache={ajouterTache}/>
            <TodoList taches={taches} toggleTache={toggleTache} supprimerTache={supprimerTache} />
        </div>
    );
}

export default HomePage;