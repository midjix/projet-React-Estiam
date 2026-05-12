import { useTransition } from "react";
import { useState } from "react";




function Todoform({ ajouterTache }) {
    const [tache, setTache] = useState("");
    const [isPending, startTransition] = useTransition();

    const addTask = () => {
        startTransition(() => {
            ajouterTache(tache);
            setTache("");
        });
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
                    <button onClick={addTask}>
                        {isPending ? "Ajout en cours..." : "Ajouter"}
                    </button>
                </div>
            </div>
        </div>
    )
}export default Todoform;