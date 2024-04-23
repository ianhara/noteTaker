const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const notePath = path.join(__dirname, "db.json");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    console.log("in the /api/notes route");
    //fs.readFile to
    fs.readFile(notePath, "utf8", (err, data) => {
      res.send(data);
    });
  });
  

app.post("/api/notes", (req, res) => {
    //not sure if this right 
  const { title, text } = req.body;
  const note = { title, text, id: uuidv4() };
  fs.readFile(notePath, "utf8", (err, data) => {
    if (!err) {
      const notes = JSON.parse(data);
      notes.push(note);

      fs.writeFile(notePath, JSON.stringify(notes), (err) => {
        if (!err) {
          res.json(note);
        }
      });
    }
  });
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
  console.log(`Server Runnning on PORT http://localhost:${PORT}`);
});
