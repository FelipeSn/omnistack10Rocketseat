const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require ('http');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0.phyrb.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors( {origin: 'http://localhost:3000'} )); // ONDE RODA A APLICAÇÃO, SE NAO SOUBER PASSAR ()
app.use(express.json()); // TEM QUE VIR ANTES DAS ROTAS
app.use(routes);

server.listen(3333);

//METODOS HTTP: get, por, put, delete - ROTAS 

//Tipos Parametro: 
//Query Params: request.query(Filtros, paginacaoo, ordenação ...)
//Route Params: request.params (Identificar recurdo na alteraçao ou removção)
//Body: request.body (Dados para criacao ou alteração de um registro)

//MONGODB - Nao Relacional

