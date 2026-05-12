import { useTransition } from "react";
import { useState } from "react";




function Todoform({ ajouterTache }) {
    const [tache, setTache] = useState({
        termine : false,
        texte : ""
    });
    const [isPending, startTransition] = useTransition();

    const addTask = () => {
        startTransition(() => {
            ajouterTache(tache.texte);
            setTache({termine: false, texte: ""});
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
                        value={tache.texte}
                        onChange={(e) => setTache({termine: false, texte: e.target.value})}
                    />
                    <button onClick={addTask}>
                        {isPending ? "Ajout en cours..." : "Ajouter"}
                    </button>
                </div>
            </div>
        </div>
    )
}export default Todoform;