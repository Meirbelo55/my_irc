var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

  var allusers =  {};
io.sockets.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect',() => {
    console.log('user disconneted');
  })
});
io.on('connection',(socket) => {
  socket.on('chat message',(msg) => {
    io.emit('chat message', msg);
  })
})
io.sockets.on('connection',(socket) => {
  var client;
  for(var k in allusers) {
    socket.emit('newuser',allusers[k]);
  }
  socket.on('username',(username) => {
    client = username;
    io.sockets.emit('newuser',username);
    socket.emit('logged');
    allusers[client] = client;
    io.sockets.emit('newuser', client);
    //console.log(username);
  })

})
http.listen(3000, () => {
  console.log('listening on *:3000');
});