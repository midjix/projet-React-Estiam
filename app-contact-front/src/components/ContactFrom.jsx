import { useState } from "react";

function ContactForm({ listContacts, addContact}) {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();  // Empêche le rechargement de la page lors de la soumission du formulaire
        if (prenom.trim() === '' || nom.trim() === '' || email.trim() === '' || telephone.trim() === '') {
            alert('Veuillez remplir tous les champs du formulaire.');
            return;
        }
        
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        if (!/^\d+$/.test(telephone)) {
            alert('Veuillez entrer un numéro de téléphone valide (chiffres uniquement).');
            return;
        }
        if (listContacts.some(contact => contact.email === email)) {
            alert('Un contact avec cette adresse email existe déjà.');
            return;
        }
        if (listContacts.some(contact => contact.telephone === telephone)) {
            alert('Un contact avec ce numéro de téléphone existe déjà.');
            return;
        }
        if (listContacts.some(contact => contact.prenom === prenom && contact.nom === nom)) {
            alert('Un contact avec ce prénom et nom existe déjà.');
            return;
        }
        const newContact = { prenom, nom, email, telephone };
        addContact(newContact);
        setPrenom('');
        setNom('');
        setEmail('');
        setTelephone('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" required />
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Téléphone" required />
            <button type="submit">Ajouter le contact</button>
        </form>
    );
}

export default ContactForm; 
