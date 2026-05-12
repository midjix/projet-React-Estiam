function TodoItem({index,tache, toggleTache, supprimerTache}) {
    return (
        <div>
            <input type="checkbox" checked={tache.termine} onChange={() => toggleTache(tache.id, !tache.termine)} />
            <span style={{ textDecoration: tache.termine ? 'line-through' : 'none' }}>{index}. {tache}</span>
            <button onClick={() => supprimerTache(tache.id)}>Delete</button>
        </div>
    )
}export default TodoItem;