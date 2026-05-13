import { useState } from "react";
import './ArticleForm.css';

function ArticleForm({ article, onSubmit }) {
    const [title, setTitle] = useState(article?.title || '');
    const [content, setContent] = useState(article?.content || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(title, content);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Titre :</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="content">Contenu :</label>
                <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <button type="submit">Enregistrer</button>
        </form>
    );
}

export default ArticleForm;
