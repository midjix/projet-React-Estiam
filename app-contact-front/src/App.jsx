import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ContactForm from './components/ContactFrom'
import ContactList from './components/ContactList'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AjoutContact from './pages/AjoutContact'
import { api } from './lib/api'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'


function App() {
  const [count, setCount] = useState(0)
  const [listContacts, setListContacts] = useState([]);
  const { user } = useAuth();

  const addContact = async (contact) => {
    const createdContact = await api.post('/contacts', contact);
    setListContacts([...listContacts, createdContact]);
  };

  const deleteContact = async (contactId) => {
    await api.delete(`/contacts/${contactId}`);
    setListContacts(listContacts.filter(contact => contact.id !== contactId));
  };

  const updateContact = async (contactId, updatedContact) => {
    const contact = await api.put(`/contacts/${contactId}`, updatedContact);
    setListContacts(listContacts.map(c => c.id === contactId ? contact : c));
  };

  useEffect(() => {
    if (user) {
      api.get('/contacts').then(setListContacts);
    }
  }, [user]);

  return (
    <>
      <nav>
        <a href="/" className='menu'>Home</a>
        <a href="/ajout" className='menu'>Ajouter un contact</a>
        <a href="/login" className='menu'>Login</a>
      </nav>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage listContacts={listContacts} deleteContact={deleteContact} updateContact={updateContact} />
          </ProtectedRoute>
        } /> 
        <Route path="/ajout" element={
          <ProtectedRoute>
            <AjoutContact listContacts={listContacts} addContact={addContact} updateContact={updateContact} deleteContact={deleteContact}/>
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>


      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
