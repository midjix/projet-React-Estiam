import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>404</h1>
            <p>La page que vous recherchez n'existe pas.</p>
            <button onClick={goBack}>Retour à l'accueil</button>
        </div>
    )
}

export default NotFound;