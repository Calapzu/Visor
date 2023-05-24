const http = require('http');
const express = require('express');
const path = require('path');
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.port || 3010;

const htmlPath = path.join(__dirname + "/express/index.html");

app.use(express.json());
app.use(express.static("express"));

// default URL for website
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/Visor.html'));
    //__dirname : It will resolve to your project folder.
});

app.post('/', function (req, resp) {
    //Creamos la instancia
    var paramo = req.body.paramo;
    var departamento = req.body.departamento;
    var municipio = req.body.municipio;
    var coordenadas = req.body.coordenadas;
    var usuario = req.body.usuario;

    console.log(paramo, departamento, municipio, coordenadas, usuario);

});

//routes
app.use("/api", require("./routes"));

const server = http.createServer(app);
server.listen(port);
console.debug('Server listening on port ' + port + '\n' + __dirname + '\nhttp://localhost:' + port);