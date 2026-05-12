import Titre from "./Titre";
import { useState } from "react";

function Formulaire() {
    const [nom, setNom] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Formulaire soumis avec le nom :", nom)
        alert(`Bonjour, ${nom} !`)
        setNom('')
    }
    return (
        <div>
            <Titre titre="Formulaire" />
            <form onSubmit={handleSubmit}>
                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Entrez votre nom..." />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    )
}export default Formulaire;