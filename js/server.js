var http = require('http')
const express = require ('express');
const app = express();

app.set('views','./views')
app.set('view engine', 'js')
app.get('/',function(req,res){
    res.render('index.js')
})
httpServer = http.createServer(function(req,res){
    res.end('bonjour');
})
httpServer.listen(1337);