let app = require("express")();
let http = require("http").createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/tchat', (req, res) => {
  res.sendFile(__dirname + '/views/tchat.html');
});


io.on('connection', (socket) => {
  let a = socket.broadcast.emit('bonjour');

  io.on('connection'), (socket) => {
    socket.on('message de tchat', (msg) => {
      io.emmit('message de tchat', (msg))
    });
  }
  
  // socket.broadcast.emit('Bonjour');


  socket.on('chat message', (msg) => {
    console.log('message ' + msg);
  })

  socket.on('disconnect', () => {
  console.log('user disconnected');
  });
});

let PORT = process.env.PORT || 1337;

http.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});