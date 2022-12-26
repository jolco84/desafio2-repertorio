const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors());

//Rutas
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
});

app.post("/canciones", (req, res) => {
    const repertorio = req.body
    const repertorios = JSON.parse(fs.readFileSync("repertorio.json"))
    repertorios.push(repertorio)
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorios))
    res.send("repertorio agregado con éxito!")
})

app.get("/canciones", (req, res) => {
    const repertorio = JSON.parse(fs.readFileSync("repertorio.json"))
    res.json(repertorio)
})

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const repertorio = req.body
    const repertorios = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = repertorios.findIndex(p => p.id == id)
    repertorios[index] = repertorio
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorios))
    res.send("repertorio modificado con éxito")

})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const repertorio = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = repertorio.findIndex(p => p.id == id)
    repertorio.splice(index, 1)
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio))
    res.send("repertorio eliminado con éxito")
})

app.listen(port, function(){
    console.log("servidor encendido")
});