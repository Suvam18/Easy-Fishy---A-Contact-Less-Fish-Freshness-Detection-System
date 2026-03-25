const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const filePath = path.join(process.cwd(), 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        try {
            users = JSON.parse(fileData);
        } catch (e) {
            users = [];
        }
    }

    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = { firstName, email, password };
    users.push(newUser);

    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 4));
        return res.status(201).json({ message: 'User created', user: { firstName, email } });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to save user' });
    }
};
