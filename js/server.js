var http = require('http')
const express = require('express');
const path = require('path');
const app = express();
var server = http.createServer(app);
var io = require ('socket.io').listen(server);
const router = express.Router();
router.get('/',function(req,res){
    res.sendFile(path.join('/home/meir/Downloads/first-year/my_irc' + '/views/index.html'))
});
io.on('connexion',(socket) => {
    console.log('un user est connecter');
})
//console.log(io);
app.use('/',router);
app.listen(1337);