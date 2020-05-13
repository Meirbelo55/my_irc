let app = require("express")();
let http = require("http").createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');

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