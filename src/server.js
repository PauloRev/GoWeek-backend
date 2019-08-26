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

// class App {
//   constructor () {
//     this.express = express()

//     this.database()
//     this.middlewares()
//     this.routes()
//   }

//   database () {
//     mongoose.connect(databaseConfig.uri, {
//       useCreateIndex: true,
//       useNewUrlParser: true
//     })
//   }

//   middlewares () {
//     this.express.use(express.json())
//     this.express.use(cors())

//     // socket.io
//     const http = require('http').Server(this)
//     const io = require('socket.io')(http)

//     this.express.use((req, res, next) => {
//       req.io = io
//       return next()
//     })
//   }

//   routes () {
//     this.express.use(require('./routes'))
//   }
// }

// module.exports = new App().express
