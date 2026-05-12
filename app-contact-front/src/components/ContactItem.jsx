import { useState } from 'react';

function ContactItem({ contact, deleteContact, updateContact }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContact, setEditContact] = useState(contact);


    const handleUpdate = () => {
        const updatedContact = {
            ...contact,
        }; //  pour garder l'id du contact

        if (!editContact.nom || !editContact.prenom || !editContact.email || !editContact.telephone) {
            return;
        }
        updateContact(contact.id, editContact);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editContact.prenom}
                        onChange={(e) => setEditContact({ ...editContact, prenom: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editContact.nom}
                        onChange={(e) => setEditContact({ ...editContact, nom: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editContact.email}
                        onChange={(e) => setEditContact({ ...editContact, email: e.target.value })}
                    />
                    <input
                        type="tel"
                        value={editContact.telephone}
                        onChange={(e) => setEditContact({ ...editContact, telephone: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Enregistrer</button>
                    <button onClick={() => setIsEditing(false)}>Annuler</button>
                </div>
            ) : (
                <>
                    <h3>{contact.prenom} {contact.nom}</h3>
                    <p>Email: {contact.email}</p>
                    <p>Téléphone: {contact.telephone}</p>
                    <button onClick={() => setIsEditing(true)}>Modifier</button>
                    <button onClick={() => deleteContact(contact.id)}>Supprimer</button>
                </>
            )}
        </div>
    );
}   export default ContactItem;