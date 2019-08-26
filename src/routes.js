const express = require('express')

const controllers = require('./app/controllers')

const routes = express.Router()

routes.get('/tweets', controllers.TweetController.index)
routes.post('/tweets', controllers.TweetController.store)

routes.post('/likes/:id', controllers.LikeController.store)

module.exports = routes
