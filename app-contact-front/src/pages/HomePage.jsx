import ContactList from "../components/ContactList";
import { useEffect } from "react";
import { api } from "../lib/api";

function HomePage( {listContacts, setListContacts, deleteContact, updateContact} ) {
    
    

    return (
        <div>
            <h1>Contacts</h1>
            <ContactList contacts={listContacts} deleteContact={deleteContact} updateContact={updateContact} />
        </div>
    );
}

export default HomePage;