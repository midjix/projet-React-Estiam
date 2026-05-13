import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import ArticleForm from "../components/ArticleForm";

function EditArticle() {
    const location = useLocation();
    const pagePrecedent = location.state?.pagePrecedent || '/';
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const article = await api.get(`/articles/${id}`);
                setArticle(article);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
                navigate('/not-found');
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return <div><h2>Loading...</h2></div>;
    }

    const handleUpdate = async (title, content) => {
        try {
            await api.put(`/articles/${id}`, { title, content });
            console.log('article modifié => ', id, title, content );
            navigate(`/article/${id}`, { state: { pagePrecedent } });
        } catch (error) {
            console.log(error);
            navigate('/not-found');
        }
    };

    return (
        <div>
            <h1>Modification de l'article</h1>
            {(user && user.email === article.authorEmail) ? (
                <ArticleForm article={article} onSubmit={handleUpdate} />
            ) : (
                <p>Vous n'avez pas l'autorisation de modifier cet article</p>
            )}
        </div>
    )
}

export default EditArticle;