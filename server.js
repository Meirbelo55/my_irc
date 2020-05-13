const path = require('path');
const http = require('http');
const express = require ('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// change le dossier "views" en dossier statique 
app.use(express.static(path.join(__dirname, 'views')));

// Se lance quand un client se connecte 
io.on('connection', socket => {
    console.log('Nouvelle Connexion Web socket');

    socket.emit('message', 'Bienvenue !');
});

const PORT = process.env.PORT || 1337;

server.listen(PORT, () => console.log(`Le serveur utilise le port ${PORT}`));