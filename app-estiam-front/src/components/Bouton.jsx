
function Bouton( {label, onClick} ) {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    )
}export default Bouton;