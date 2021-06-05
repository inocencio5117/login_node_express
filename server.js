require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.emit('ready')
  })
  .catch(e => console.log(e))
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const routes = require('./routes')
const path = require('path')
const csrf = require('csurf')
const { checkForErrors, csrfMiddleware, messagesMiddleware } = require('./src/middlewares/middleware')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))


const sessionOptions = session({
  secret: 'secret',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions)
app.use(flash())


app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')


app.use(csrf())
// middlewares
app.use(checkForErrors)
app.use(csrfMiddleware)
app.use(messagesMiddleware)
app.use(routes)


app.on('ready', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000')
  })
})