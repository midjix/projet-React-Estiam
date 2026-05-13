require('dotenv').config(); // pour charger les variables d'environnement depuis le fichier .env
const express = require('express');// pour créer le serveur Express
const cors = require('cors');// pour permettre les requêtes cross-origin
const bcrypt = require('bcryptjs'); // pour hasher les mots de passe et les comparer lors de la connexion
const jwt = require('jsonwebtoken'); // pour créer et vérifier les tokens JWT pour l'authentification
const app = express();

app.use(express.json()); // pour permettre l'envoi de données JSON dans les requêtes POST et PUT
app.use(cors()); // pour permettre les requêtes cross-origin

const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET;

const users = [];

(async () => {
    const hashedPassword = await bcrypt.hash('password', 10);
    users.push({
        id: 1,
        email: 'admin@test.com',
        password: hashedPassword,
    });
})();

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({ error: 'hashedPassword' }); //pour requerir le token de l'utilisateur connecté
     const token = authHeader.split(' ')[1]; // pour extraire le token de l'en-tête
     try {
         const decoded = jwt.verify(token, JWT_SECRET); // pour vérifier le token
         req.user = decoded;
         next();
     } catch (err) {
         return res.status(403).json({ error: 'invalid or expired token' }); // pour retourner une erreur si le token est invalide
     }
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email); // pour trouver l'utilisateur
    if (!user) return res.status(401).json({ error: 'User not found' }); // pour retourner une erreur si l'utilisateur n'est pas trouvé
    const isPasswordValid = await bcrypt.compare(password, user.password); // pour comparer le mot de passe
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' }); // pour retourner une erreur si le mot de passe est invalide
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' }); // pour créer le token JWT
    res.json({ token }); // pour retourner le token
})

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email); // pour trouver l'utilisateur
    if (user) return res.status(409).json({ error: 'User already exists' }); // pour retourner une erreur si l'utilisateur existe
    const hashedPassword = await bcrypt.hash(password, 10); // pour hasher le mot de passe
    users.push({
        id: users.length + 1,
        email,
        password: hashedPassword,
    });
    const token = jwt.sign({ id: users.length, email }, JWT_SECRET, { expiresIn: '1h' }); // pour créer le token JWT
    res.json({ token }); // pour retourner le token
})

const date = new Date();

let articles = [
    { id: 1, title: 'Article 1', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', date: '2025-01-01', authorEmail: 'admin@test.com' },
    { id: 2, title: 'Article 2', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', date: '2025-01-02', authorEmail: 'admin@test.com' },
];

let nextId = 3;

app.post('/articles', requireAuth, (req, res) => {
    const { title, content } = req.body;
    const article = {
        id: nextId,
        title,
        content,
        date: date.toISOString().slice(0, 10), // pour formater la date en jj/mm/aaaa en extrayant les 10 premiers caracteres (YYYY-MM-DD)
        authorEmail: req.user.email,
    };
    articles.push(article);
    nextId++;
    res.json(article);
});

app.get('/articles', (req, res) => {
    const titles = articles.map(article => ({id: article.id, title: article.title, date: article.date, authorEmail: article.authorEmail})); // pour extraire les titres des articles
    res.json(titles);
});

app.get('/articles/author', requireAuth, (req, res) => {
    const email = req.user.email;
    console.log(`email : ${email}`);
    const article = articles.find(article => article.authorEmail === email); // pour trouver l'article
    console.log(`article : ${article.title}`);
    res.json(article); // pour retourner l'article  
});

app.get('/articles/:id', (req, res) => {
    const { id } = req.params;
    const article = articles.find(article => article.id === parseInt(id)); // pour trouver l'article
    if (!article) return res.status(404).json({ error: 'Article not found' }); // pour retourner une erreur si l'article n'est pas trouvé
    res.json(article); // pour retourner l'article  
});

app.put('/articles/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const article = articles.find(article => article.id === parseInt(id)); // pour trouver l'article
    if (!article) return res.status(404).json({ error: 'Article not found' }); // pour retourner une erreur si l'article n'est pas trouvé
    if(article.authorEmail !== req.user.email) return res.status(403).json({ error: 'You are not the author of this article' }); // pour retourner une erreur si l'utilisateur n'est pas l'auteur
    article.title = title;
    article.content = content;
    res.json(article); // pour retourner l'article
});

app.delete('/articles/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    const article = articles.find(article => article.id === parseInt(id)); // pour trouver l'article
    if (!article) return res.status(404).json({ error: 'Article not found' }); // pour retourner une erreur si l'article n'est pas trouvé
    if(article.authorEmail !== req.user.email) return res.status(403).json({ error: 'You are not the author of this article' }); // pour retourner une erreur si l'utilisateur n'est pas l'auteur
    articles = articles.filter(article => article.id !== parseInt(id)); // pour supprimer l'article
    res.json({ message: 'Article deleted' }); // pour retourner un message de confirmation
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

