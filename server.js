const express = require('express');
const { get } = require('http');
const app = express()
const PORT = 3001

app.use(express.static('public'));

app.get('./notes' , (req, res) =>{


})

app.get('/api/notes', (req, res) =>{
    res.json(/* send note data*/)
})

app.post('/api/notes', (req, res) => {

})

app.listen(PORT,() =>
console.log(`Listening at http://localhost:${PORT} 🚀`))