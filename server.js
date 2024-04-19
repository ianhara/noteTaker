const express = require('express')
const fs = require('fs')
const path = require('path')

const notePath = path.join(__dirname, 'db.json')


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get("/notes", (req, res)=>{
 res.sendFile(path.join(__dirname,"./public/notes.html"))
});

app.get('/api/notes',(req, res)=>{
    console.log("in the /api/notes route")
    //fs.readFile to 
    fs.readFile(notePath, 'utf8',(err,data)=>{
res.send(data)
    })
    //send results 
})

app.get(('*'),(req, res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
    })



app.listen(PORT,function (){
    console.log(`Server Runnning on PORT http://localhost:${PORT}`)
})