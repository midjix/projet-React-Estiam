import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Navbar.css';

function Navbar() {
    const { user, logout } = useAuth();
    return (
        <nav>
           <Link to="/">Accueil</Link>
           {user ? (
            <>
                <Link to="/create">Créer un article</Link>
                <Link to="/my-articles">Mes articles</Link>
                <button onClick={logout}>Déconnexion</button>
            </>
           ) : (
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
           )}
        </nav>
    );
} export default Navbar;