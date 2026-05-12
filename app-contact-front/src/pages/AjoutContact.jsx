import ContactForm from '../components/ContactFrom';
import ContactList from '../components/ContactList';

function AjoutContact( {listContacts, addContact, updateContact, deleteContact} ) {
    return (
        <div>
            <h1>Ajouter un contact</h1>
            <ContactForm listContacts={listContacts} addContact={addContact} />
            <ContactList contacts={listContacts} updateContact={updateContact} deleteContact={deleteContact} />
        </div>
    );
}

export default AjoutContact;
