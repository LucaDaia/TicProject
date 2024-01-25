require('dotenv').config()

const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const port = 3000;
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

app.use(express.json())

let refreshTokens = []
let users = []


app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.username, password: hashedPassword}
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
    //Authenticate user using username and password
    const user = users.find(user => user.name === req.body.username)
    if(user == null) {
      return res.status(400).send("Cannot find user!")
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        const accesToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2000s' })
        refreshTokens.push(refreshToken)
        res.json({ accesToken: accesToken, refreshToken: refreshToken, message: `Welcome ${user.name} !` })
      } else {
        res.send('Not allowed')
      }
    } catch {
      res.status(500).send()
    }

    // const username = req.body.username
    // const user = { name: username}
    
  })

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
  })
  
  app.delete('/users/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
  })

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: '2000s' }) //33 minute
}

app.listen(4000)