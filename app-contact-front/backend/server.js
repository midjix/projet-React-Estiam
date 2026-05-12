require('dotenv').config(); // pour charger les variables d'environnement depuis le fichier .env
const express = require('express');// pour créer le serveur Express
const cors = require('cors');// pour permettre les requêtes cross-origin
const bcrypt = require('bcryptjs'); // pour hasher les mots de passe et les comparer lors de la connexion
const jwt = require('jsonwebtoken'); // pour créer et vérifier les tokens JWT pour l'authentification
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3002;
const JWT_SECRET = process.env.JWT_SECRET;

const users = [];

(async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    users.push({ id: 1, email: 'admin@test.com', password: hashedPassword });
})();

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'no token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

const contacts = [
    { id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com', telephone: '0612345678' },
    { id: 2, nom: 'Durand', prenom: 'Marie', email: 'marie.durand@example.com', telephone: '0687654321' },
    { id: 3, nom: 'Martin', prenom: 'Paul', email: 'paul.martin@example.com', telephone: '0654321098' },
    { id: 4, nom: 'Bernard', prenom: 'Sophie', email: 'sophie.bernard@example.com', telephone: '0643210987' },
    { id: 5, nom: 'Lefevre', prenom: 'Luc', email: 'luc.lefevre@example.com', telephone: '0632109876' }
];



let nextId = 6;
app.get('/contacts', requireAuth, (req, res) => {
    res.json(contacts);
});

app.post('/contacts', requireAuth, (req, res) => {
    const newContact = req.body;
    newContact.id = nextId++;
    contacts.push(newContact);
    res.json(newContact);
});

app.put('/contacts/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        contacts[index] = { id, ...req.body };
        res.json(contacts[index]);
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});

app.delete('/contacts/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        contacts.splice(index, 1);
        res.json({ message: 'Contact deleted' });
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
