const express = require('express');
const path = require('path');
const connectDB = require('./config/database');
const routes = require('./routes/route');

require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

const apiInfo = (req, res) => {
    res.json({
        success: true,
        message: 'Task Manager API is running',
        routes: {
            auth: ['/api/v1/signup', '/api/v1/login', '/api/v1/logout', '/api/v1/me'],
            tasks: ['/api/v1/tasks', '/api/v1/tasks/:id']
        }
    });
};

app.get('/api', apiInfo);

if (process.env.NODE_ENV !== 'production') {
    app.get('/', apiInfo);
}

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is healthy'
    });
});

app.use('/api/v1', routes);

const clientBuildPath = path.join(__dirname, '../Client/build');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(clientBuildPath));

    app.use((req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    });
