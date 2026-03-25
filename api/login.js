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

    const { email, password } = req.body;

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

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        return res.status(200).json({ message: 'Login successful', user: { firstName: user.firstName, email: user.email } });
    } else {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
};
