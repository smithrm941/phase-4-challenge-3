const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const session = require('express-session')

const port = process.env.PORT || 3000

const app = express()

require('ejs')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'cheesy bacon',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000,
  },
}))

app.use('/', routes)

app.use((req, res, next) => {
  res.locals.loggedInUser = {}
  next()
})

app.use((req, res) => {
  res.status(404).render('not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
