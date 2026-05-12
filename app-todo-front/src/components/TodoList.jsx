import TodoItem from "./TodoItem";

function TodoList({taches}) {
    return (
        <div>
            <h1>TodoList</h1>
            <ul>
                {taches.map((tache, index) => (
                    <li key={index}>
                         <TodoItem index={index + 1} tache={tache} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TodoList;