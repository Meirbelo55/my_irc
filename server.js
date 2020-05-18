const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const channels = {}

app.get('/', (req, res) => {
  res.render('index', { channels: channels })
})

app.get('/:channel', (res, req) => {
  res.render('channel', { channelName: req.params.channel })
})

const users = {}


// <-------- message lors de la connexion d'un utilisateur ------------>
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('Bienvenue, ', name)
  })


  // <----------- affichage d'un message dans le tchat suivi du nom de l'utilisateur  ------------->
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

  // <----------------- affichage d'un message de deconnexion suivi du nom de l'utilisateur deconnecté ----------->
  socket.on('disconnect', () => {
    socket.broadcast.emit('Utilisateur deconnecté', users[socketet.id])
    delete users[socket.id]
  })
})