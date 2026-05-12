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
    const user = users.find(user => user.email === email);
    if(!user) return res.status(401).json({ error: 'invalid credentials' }); // pour retourner une erreur si l'utilisateur n'est pas trouvé
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(401).json({ error: 'invalid credentials' }); // pour retourner une erreur si le mot de passe est incorrect
    const token = jwt.sign({ user: user.id }, JWT_SECRET, { expiresIn: '1h' }); // pour générer un token JWT
    res.json({ token }); // pour retourner le token JWT
})

let taches = [
    { id: 1, texte: 'Tache 1' , termine: false },
    { id: 2, texte: 'Tache 2' , termine: false },
    { id: 3, texte: 'Tache 3' , termine: false },
    { id: 4, texte: 'Tache 4' , termine: false },
    { id: 5, texte: 'Tache 5' , termine: false},
];

let nextId = 6;

app.get('/taches', requireAuth, (req, res) => {
    res.json(taches); // pour retourner les taches
})

app.post('/taches', requireAuth, (req, res) => {
    const newTache = req.body;
    newTache.id = nextId;
    nextId++;
    taches.push(newTache);
    res.json(newTache);
})

app.put('/taches/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = taches.findIndex(tache => tache.id === id);
    if (index !== -1) {
        taches[index] = { id, ...req.body };
        res.json(taches[index]);
    } else {
        res.status(404).json({ error: 'Tache non trouvée' });
    }
})

app.delete('/taches/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = taches.findIndex(tache => tache.id === id);
    if (index !== -1) {
        taches.splice(index, 1); 
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Tache non trouvée' });
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3001`);
});