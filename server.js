const express = require('express');
// const uuid =
const path =require('path');
const app = express();
const fs = require('fs')
const PORT = 3001

const note = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/' , (req, res) =>
    res.sendFile(path.join(__dirname, '/public/'))
);

app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request received to get notes`)
    console.log(`${req.method} request received to get notes`)
})

app.post('/api/notes', (req, res) => {
console.log(`${req.method} request received to add a note`)

const {title, text} = req.body;

if (title && text){
    const newNote = {
        title,
        text,
        // review_id: uuid ()
    };
note.push( newNote)
 const noteString = JSON.stringify(newNote);
fs.appendFile('./db/db.json', noteString, (err) => err
? console.error(err)
:console.log(`Note for ${newNote.title} had been written to JSON file`
)
);
const response = {
    status: 'success',
    body: newNote,
};

console.log(response);
res.status(201).json(response)
}else {
    res.status(500).json('Error in posting note')
}
})

app.listen(PORT,() =>
console.log(`🚀 Listening at http://localhost:${PORT} 🚀`))