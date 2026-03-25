const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Helper to load users
const getUsers = () => {
    const filePath = path.join(__dirname, 'users.json');
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return [];
};

// Helper to save users
const saveUsers = (users) => {
    const filePath = path.join(__dirname, 'users.json');
    fs.writeFileSync(filePath, JSON.stringify(users, null, 4));
};

// Signup Endpoint
app.post('/api/signup', (req, res) => {
    const { firstName, email, password } = req.body;
    if (!firstName || !email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const users = getUsers();
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = { firstName, email, password };
    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: 'User created', user: { firstName, email } });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.status(200).json({ message: 'Login successful', user: { firstName: user.firstName, email: user.email } });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
