//library
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let allusers = {};

//connection
io.sockets.on('connection', (socket) => {
    console.log('a user connected');
    //deconnection
    socket.on('disconnect',() => {
        console.log('user disconneted');
    })
    //message
  socket.on('chat message',(msg) => {
    io.emit('chat message', msg);
  })
})
//stoker et parcourir les username
io.sockets.on('connection',(socket) => {
  //var client = false;
  for(var k in allusers) {
    socket.emit('newuser',allusers[k]);
  }
  //username
  socket.on('username',(username) => {
    client = username;

    io.sockets.emit('username',username);
      socket.emit('logged');
      allusers[client] = client;

    io.sockets.emit('newuser', client);
  })
})
http.listen(3000, () => {
  console.log('listening on *:3000');
});