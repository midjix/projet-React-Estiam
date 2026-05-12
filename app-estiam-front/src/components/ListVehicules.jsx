import { useState } from 'react'

function ListVehicules() {
    const [ListVehicules, setListVehicules] = useState(['Voiture', 'Moto', 'Vélo', 'Bus', 'Train'])
    const [vehiculeInput, setVehiculeInput] = useState('')
    const ajouter = () => {
    setListVehicules([...ListVehicules, vehiculeInput])
    setVehiculeInput('')
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Ajouter un véhicule..."
                value={vehiculeInput}
                onChange={(e) => setVehiculeInput(e.target.value)}     
            />  
            <button onClick={ajouter}>
                Ajouter
            </button>
            <ul>
            {ListVehicules.map((vehicule, index) => (
                <li key={index}>{vehicule}</li>
            ))}
            </ul>
        </div>
  
    )

}

export default ListVehicules