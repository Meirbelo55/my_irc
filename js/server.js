var http = require('http')
var io = require('socket.io')(http);
const express = require('express');
const path = require('path');
const app = express();
const server = http.createServer(app);
const router = express.Router();
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/js/index.html'))
});
io.on('connexion',(socket) => {
    console.log('un user est connecter');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

app.use('/',router);
server.listen(3000)