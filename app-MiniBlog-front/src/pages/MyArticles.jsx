import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function MyArticles() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    const getMyArticles = async () => {
        try {
            const response = await api.get(`/articles`);
            
            console.log('user email : ' + user.email);
            setArticles(response.filter(article => article.authorEmail === user.email));
            console.log('articles users : ' + response.filter(article => article.authorEmail === user.email));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        getMyArticles();
    }, []);
    return (
        <div>
            <h1>MyArticles</h1>
            {articles.map((article) => 
                <div key={article.id} className="article-row">
                    <div className="article-header">
                        <h2><Link to={`/article/${article.id}`} state={{ pagePrecedent: '/my-articles' }}>{article.title}</Link></h2>
                        <p>{article.date}</p>
                    </div>
                </div> 
            )}
        </div>
    )
}

export default MyArticles;