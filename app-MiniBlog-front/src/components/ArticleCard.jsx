
function ArticleCard({ article }) {
    
    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>Créer le : {article.date}</p>
            <p>Auteur : {article.authorEmail}</p>
        </div>
    )
}

export default ArticleCard;