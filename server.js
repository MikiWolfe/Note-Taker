const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path =require('path');
const app = express();
const fs = require('fs')
const PORT = process.env.PORT || 3001;
const magenta= "\x1b[35m"

const note = require('./db/db.json');

// Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET request:
app.get('*' , (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes' , (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(note);
    // res.status(200).json(`${req.method} request received to get notes`)
    console.log(`${req.method} request received to get notes`)
});

// POST request
app.post('/api/notes', (req, res) => {
console.log(`${req.method} request received to add a note`)

const {title, text} = req.body;

if (title && text) {
    const newNote = {
        title,
        text,
        id: uuidv4()
    };

note.push(newNote);

const combinedNotes = JSON.stringify(note, null, 4);

fs.writeFile('./db/db.json', combinedNotes,'utf8', (err) => err
    ? console.error(err)
    : console.log(`Note for ${newNote.title} had been written to JSON file`));

const response = {
    status: 'success',
    body: newNote,
};

console.log(response);
res.status(201).json(response)
} 
else {
    res.status(500).json('Error in posting note')
}
})


// `DELETE /api/notes/:id` should receive a query parameter that
//  contains the id of a note to delete. To delete a note, you'll
//  need to read all notes from the `db.json` file, remove the note 
// with the given `id` 
//  property, and then rewrite the notes to the `db.json` file.

// app.delete('/api/notes/:id', (req, res) =>{  })

app.listen(PORT,() =>
console.log(magenta, `🚀 Listening at http://localhost:${PORT} 🚀`))


