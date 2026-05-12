import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        login(email, password).then(() =>
            navigate('/')
        ).catch((error) => {
            console.log(error);
            alert('Erreur de connexion : ' + error.message);
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='login'>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;