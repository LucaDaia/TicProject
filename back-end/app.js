require('dotenv').config()

const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const port = 3000;
const {getMovies, addMovie, getCategories, addCategory} = require('./config')

const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(cors())

let movies = []


app.get('/movies', authenticateToken, async (req, res) => {
  try{ 
    movies = await getMovies();
    if(movies == null) {
        res.send("No movies")
    }
    else {res.json(movies.filter(movie => movie.username === req.user.name))}
  } catch(e) {
    res.status(500).send(e)
  }
    
})

app.post('/movies', authenticateToken,async (req, res) => {
    // movies.push({ username: req.user.name, title: req.body.title, category: req.body.category , description: req.body.description, cast: req.body.cast })
    const mta = {
        username: req.user.name,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        cast: req.body.cast,
        duration: req.body.duration,
        rating: req.body.rating
    }
    try {
    await addMovie(mta.username, mta.title, mta.category, mta.description, mta.cast, mta.duration, mta.rating)
    res.status(201).send("Movie added")
    } catch(e) {
        res.status(500).send(e)
    }
})

app.get('/category', authenticateToken,async (req, res) => {
   try {
    const categories = await getCategories()
    if(!categories) {
        res.send("No categories")
    }
    else {
        res.json(categories)
    }
   } catch(e) {
    res.status(500).send("Couldn't get categories")
   }
})

app.post('/category', authenticateToken, async (req, res) => {
    const cta = {
        nameOfCategory: req.body.nameOfCategory,
        stapleMovies: req.body.stapleMovies
    }

    try {
        await addCategory(cta.nameOfCategory, cta.stapleMovies)
        res.status(201).send("Movie added")
    } catch(e) {
        res.status(500).send("Couldn't add category")
    }
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
