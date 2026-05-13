import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import ArticleForm from "../components/ArticleForm";
import { Link } from "react-router-dom";


function CreateArticle() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (title, content) => {
        try {
            const article = await api.post('/articles', { title, content });
            navigate('/article/' + article.id);
        } catch (error) {
            console.log(error);
            alert('Erreur de création : ' + error.message);
        }
    };
    return (
        <div>
        <div className="new-article">
            <h1>Création d'un article</h1>
            <ArticleForm onSubmit={handleSubmit} />
        </div>
        
        <Link to="/">Retour</Link>
        
        </div>
    )
}

export default CreateArticle;