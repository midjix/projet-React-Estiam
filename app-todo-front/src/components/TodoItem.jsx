function TodoItem({index,tache}) {
    return (
        <div>
            <input type="checkbox" />
            <span>{index}. {tache}</span>
        </div>
    )
}export default TodoItem;