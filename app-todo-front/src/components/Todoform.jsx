import { useTransition } from "react";
import { useState } from "react";
import TodoList from "./TodoList";
import './Todoform.css'

function Todoform() {
    const [listTaches, setListTaches] = useState([]);
    const [tache, setTache] = useState("");
    const [indexSelectionne, setIndexSelectionne] = useState(null);

    const ajouterTache = () => {
        if (tache.trim() !== "") {
            setListTaches([...listTaches, tache]);
            setTache("");
            console.log("Tâche ajoutée :", tache);
        }
    };

    const suprimerTache = (index) => {
        const newListTaches = listTaches.filter((_, i) => i !== index - 1);
        setListTaches(newListTaches);
        setIndexSelectionne(null);
        console.log("Tâche supprimée à l'index :", index);
    };

    return (
        <div>
            <h1>Todo</h1>
                <div className="todo-ajouter-supprimer-tache">
                    <div className="todo-ajouter-tache">
                         <h2>Ajouter une tâche</h2>
                         <input
                            type="text"
                            placeholder="Ajouter une tâche"
                            value={tache}
                            onChange={(e) => setTache(e.target.value)}
                        />
                        <button onClick={ajouterTache}>
                            Ajouter
                        </button>
                    </div>
                    <div className="todo-supprimer-tache">
                        <h2>Supprimer une tâche</h2>
                        <input
                            type="number"
                            min="1"
                            max={listTaches.length}
                            placeholder="Index de la tâche à supprimer"
                            value={indexSelectionne}
                            onChange={(e) => setIndexSelectionne(parseInt(e.target.value) || null)}
                        />  
                        <button onClick={() => suprimerTache(indexSelectionne)} disabled={listTaches.length === 0 || indexSelectionne === null || indexSelectionne < 0 || indexSelectionne >= listTaches.length}>
                            supprimer la taches
                        </button>
                    </div>
                    
                    
                </div>
                <TodoList taches={listTaches} />
            
        </div>
    )
}export default Todoform;