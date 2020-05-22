const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/views")));

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Le serveur se lance sur le port ${PORT}`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/form.html");
});

app.get("/tchat", (req, res) => {
  res.sendFile(__dirname + "/public/views/tchat.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// <-------- message lors de la connexion d'un utilisateur ------------>
io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("Bienvenue, ", name);
  });

  // <----------- affichage d'un message dans le tchat suivi du nom de l'utilisateur  ------------->
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });

  // <----------------- affichage d'un message de deconnexion suivi du nom de l'utilisateur deconnecté ----------->
  socket.on("disconnect", () => {
    socket.broadcast.emit("Utilisateur deconnecté", users[socketet.id]);
    delete users[socket.id];
  });
});
