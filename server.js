const { json } = require('body-parser');
const express = require('express');
const { get } = require('http');
// const uuid =
const app = express()
const PORT = 3001

const db = require('./db/db.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('./notes/' , (req, res) =>{
    res.sendFile(path.join(__dirname, '/public'))
})

app.get('/api/notes', (req, res) =>{
    res.json(`${req.method} request received to get notes`)
    console.log(`${req.method} request received to get notes`)
})

app.post('/api/notes', (req, res) => {
console.log(`$${req.method} request received to add a note`)

const { title , text } = req.body;
if (title ){}
})

app.listen(PORT,() =>
console.log(`🚀 Listening at http://localhost:${PORT} 🚀`))