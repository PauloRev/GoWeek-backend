const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

const server = express()

// database
mongoose.connect(databaseConfig.uri, {
  useCreateIndex: true,
  useNewUrlParser: true
})

// socket.io
const http = require('http').Server(server)
const io = require('socket.io')(http)

server.use((req, res, next) => {
  req.io = io
  return next()
})

// middlewares
server.use(express.json())
server.use(cors())

// routes
server.use(require('./routes'))

http.listen(3001, () => {
  console.log('Server started in port 3001')
})
