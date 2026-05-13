import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { useAuth } from "../context/AuthContext";
import './ArticleDetail.css';

function ArticleDetail() {
    const location = useLocation();
    const pagePrecedent = location.state?.pagePrecedent || '/';
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

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

    const handleDelete = async (id) => {
        await api.delete(`/articles/${id}`);
        navigate(pagePrecedent);
    };

    const goBack = () => {
        navigate(pagePrecedent);
    };
    
    return (
        <div>
            <ArticleCard article={article} />
            <div className="article-actions">
                {user && user.email === article.authorEmail && (
                    <>
                        <Link to={`/edit/${article.id}`} state={{ pagePrecedent }} className="action-btn">Modifier</Link>
                        <button onClick={() => handleDelete(article.id)} className="action-btn danger">Supprimer</button>
                    </>
                )}
                <button onClick={goBack} className="action-btn">Retour</button>
            </div>
        </div>
    );
}

export default ArticleDetail;