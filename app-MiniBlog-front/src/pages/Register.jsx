import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Register() {
    const { register, login } = useAuth();
    const navigate = useNavigate();
    const [userExists, setUserExists] = useState(false);
    
    return (
        <div>
            <h1>Créer un compte</h1>
            <form onSubmit={async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                const error = await register(email, password);
                if (error) {
                    setUserExists(true);
                    console.log( error + "L'utilisateur existe déjà ==> page register");
                    return;
                }
                try {
                    await login(email, password);
                    navigate("/");
                } catch (error) {
                    console.log(error);
                }
            }}>
                <label htmlFor="email">Email : </label>
                <input type="email" id="email" name="email" /><br />
                {userExists && <p style={{ color: 'red' }}>L'utilisateur existe déjà</p>}
                <label htmlFor="password">Mot de passe : </label>
                <input type="password" id="password" name="password" /><br />
                <button type="submit">Créer un compte</button>
            </form>
            <p>Vous avez déjà un compte? <Link to="/login">Connectez-vous</Link></p>
        </div>
    )
}

export default Register;