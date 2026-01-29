const http = require('http');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

// Connect Database
connectDB();

const server = http.createServer((req, res) => {
    // Set headers
    res.setHeader('Content-Type', 'application/json');

    // Simple logging
    console.log(`${req.method} ${req.url}`);

    // CORS (Optional but good for testing)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Helper to collect body
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            if (body) {
                req.body = JSON.parse(body);
            }
        } catch (e) {
            req.body = {};
        }

        // Routing
        if (req.url === '/' && req.method === 'GET') {
            res.writeHead(200);
            res.end('JWT Auth API running');
        } else if (req.url.startsWith('/api/auth')) {
            // Forward to auth routes
            await authRoutes(req, res);
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
