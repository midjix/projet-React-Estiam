import TodoItem from "./TodoItem";

function TodoList({taches, toggleTache, supprimerTache}) {
    return (
        <div>
            <h1>TodoList</h1>
            <ul>
                {taches.map((tache, index) => (
                    <li key={index}>
                         <TodoItem index={index + 1} tache={tache} toggleTache={toggleTache} supprimerTache={supprimerTache} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TodoList;