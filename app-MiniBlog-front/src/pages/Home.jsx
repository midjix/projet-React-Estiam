import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    const getPosts = async () => {
        try {
            const response = await api.get('/articles');
            setArticles(response);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {articles.map((article) => (
                <div key={article.id} className="article-row">
                    <div className="article-header">
                        <h2><Link to={`/article/${article.id}`} state={{ pagePrecedent: '/' }}>{article.title}</Link></h2>
                        <p>{article.date}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home;