const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authRoutes = async (req, res) => {
    const { url, method } = req;

    if (url === '/api/auth/register' && method === 'POST') {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'Please enter all fields' }));
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'User already exists' }));
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            res.writeHead(201);
            res.end(JSON.stringify({ message: 'User created successfully' }));
        } catch (err) {
            console.error(err);
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Server error' }));
        }
    }
    else if (url === '/api/auth/login' && method === 'POST') {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'Please enter all fields' }));
            }

            const user = await User.findOne({ email });
            if (!user) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'Invalid credentials' }));
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'Invalid credentials' }));
            }

            const payload = { id: user._id, email: user.email };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

            res.writeHead(200);
            res.end(JSON.stringify({ token }));
        } catch (err) {
            console.error(err);
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Server error' }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Auth route not found' }));
    }
};

module.exports = authRoutes;
