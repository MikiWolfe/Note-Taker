const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path =require('path');
const app = express();
const fs = require('fs')
const PORT = process.env.PORT || 3001;
const magenta= "\x1b[35m"

const note = require('./db/db.json');
const res = require('express/lib/response');

// Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET request:
app.get('/' , (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes' , (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
res.sendFile(path.join(__dirname, '/db/db.json'))
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


// app.get('/:id', (req, res) => {
//     const noteId = req.params.id;
//     readFromFile('./db/db.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         const result = json.filter((id) => id === noteId);
//         return result.length > 0
//           ? res.json(result)
//           : res.json('Unable to delete this note');
//       });
//   });
  

app.delete('/api/notes/:id', (req, res) => {
let noteJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));
console.log("hello", noteJson)
console.log("world", req.params.id)
let noteId = req.params.id
noteJson.filter(element => element.id === noteId)





// This for loop works
// for (let i = 0; i < noteJson.length; i++) {
//     if (noteJson[i].id.toString() === noteId) {
//         noteJson.splice(i, 1 )
//         console.log("hey", noteJson)
//     }
// }
fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(noteJson))
res.sendStatus(200)

});



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/404.html'))
})

app.listen(PORT,() =>
console.log(magenta, `🚀 Listening at http://localhost:${PORT} 🚀`));


