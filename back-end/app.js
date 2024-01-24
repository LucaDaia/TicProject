require('dotenv').config()

const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const port = 3000;

const jwt = require('jsonwebtoken')

app.use(express.json())

const movies = [
    {
        username: 'Luca',
        title: 'Movie1',
        category: 'Drama',
        description: 'kmsdfmkdsmf',
        cast: "Tom hanks"
    },
    {
        username: 'Ion',
        title: 'Movie2',
        catergory: 'Thriller',
        description: "jsdfjkdsfdsjfkdsk",
        cast: "Sebastian Stan"
    }
]

app.get('/movies', authenticateToken, (req, res) => {
    res.json(movies.filter(movie => movie.username === req.user.name))
})

app.post('/movies', authenticateToken, (req, res) => {
    movies.push({ username: req.user.name, title: req.body.title, description: req.body.description, cast: req.body.cast })
    res.json(movies)
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification failed:", err.message);
            // Instead of sending the status and JSON here, call the next middleware with an error
            return next(err);
        }

        req.user = user;
        next();
    })
}

// Error handling middleware to avoid "headers sent" error
app.use((err, req, res, next) => {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
    }

    console.error("Error:", err.message);
    res.status(403).json({ error: 'Token verification failed' });
});

app.listen(3000);
