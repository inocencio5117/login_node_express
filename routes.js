const express = require('express')
const routes = express.Router()

const indexController = require('./src/controllers/indexController')
const loginController = require('./src/controllers/loginController')
const registerConroller = require('./src/controllers/registerController')


const { requireLogin } = require('./src/middlewares/middleware')

// rotas do index
routes.get('/', indexController.index)

// rotas de login
routes.get('/login', loginController.index)
routes.post('/login', loginController.login)
routes.get('/logout', loginController.logout)

// rotas do register
routes.get('/register', registerConroller.index)
routes.post('/register', registerConroller.register)


module.exports = routes
