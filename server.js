const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const magenta = "\x1b[35m";
const notePast = require("./db/db.json");

// Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET request:
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
  console.log(`${req.method} request received to get notes`);
});

// POST request
app.post("/api/notes", (req, res) => {
  console.log(`${req.method} request received to add a note`);
  let notePast = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/db/db.json"))
  );

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    notePast.push(newNote);

    const combinedNotes = JSON.stringify(notePast, null, 4);

    fs.writeFile("./db/db.json", combinedNotes, "utf8", (err) =>
      err
        ? console.error(err)
        : console.log(`Note for ${newNote.title} had been written to JSON file`)
    );

    const response = {
      status: "success",
      body: newNote,
    };

    // console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  let noteJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/db/db.json"))
  );
  let noteId = req.params.id;
  console.log(noteJson);
  noteJson = noteJson.filter((note) => note.id !== noteId);

  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(noteJson, null, 4)
  );
  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/404.html"));
});

app.listen(PORT, () =>
  console.log(magenta, `🚀 Listening at http://localhost:${PORT} 🚀`)
);
