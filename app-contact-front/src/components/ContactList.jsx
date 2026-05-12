import { useState } from "react";
import ContactItem from "./ContactItem";

function ContactList({ contacts, deleteContact, updateContact }) {
    
    return (
        <div>
            {contacts.map(contact => (
                <ContactItem 
                    key={contact.id} 
                    contact={contact} 
                    deleteContact={deleteContact} 
                    updateContact={updateContact} 
                />
            ))}
        </div>
    );
}

export default ContactList;
