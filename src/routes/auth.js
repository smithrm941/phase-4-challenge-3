const db = require('../db')
const auth = require('express').Router()

auth.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('error', { error })
    } else {
      db.getRecentReviews((error, reviews) => {
        if (error) {
          res.status(500).render('error', { error })
        } else {
          res.render('index', { albums, reviews, loggedInUser: req.session.user })
        }
      })
    }
  })
})

auth.get('/signin', (req, res) => {
  res.render('signin', { loggedInUser: null, message: '' })
})

auth.post('/signin', (req, res) => {
  const userData = req.body
  const { email, password } = userData
  if (!userData.email || !userData.password) {
    res.render('signin', { loggedInUser: null, message: 'You must input an email and password.' })
  } else {
    db.authenticateExistingUser(userData, (error, currentUser) => {
      if (error) {
        res.status(500).render('error', { error })
      } else {
        const loggedInUser = currentUser[0]
        if (loggedInUser === undefined) {
          res.render('signin', { loggedInUser: null, message: 'Incorrect email or password.' })
        } else {
          req.session.user = loggedInUser
          res.redirect(`/users/${loggedInUser.id}`)
        }
      }
    })
  }
})

auth.get('/signup', (req, res) => {
  res.render('signup', { loggedInUser: null, message: '' })
})

auth.post('/signup', (req, res) => {
  userData = req.body
  const { name, email, password } = userData
  if (!userData.name || !userData.email || !userData.password) {
    res.render('signup', { loggedInUser: null, message: 'No fields can be left blank' })
  } else {
    db.checkDatabaseForEmail(userData, (error, existingUser) => {
      if (error) {
        res.status(500).render('error', { error })
      } else {
        const userExists = existingUser[0]
        if (userExists) {
          res.render('signup', { loggedInUser: null, message: 'User already exists' })
        } else {
          db.createUser(userData, (error, newUser) => {
            if (error) {
              res.status(500).render('error', { error, loggedInUser: req.session.user })
            } else {
              const loggedInUser = newUser[0]
              req.session.user = loggedInUser
              res.redirect(`/users/${loggedInUser.id}`)
            }
          })
        }
      }
    })
  }
})

auth.get('/signout', (req, res) => {
  req.session.user = null
  res.redirect('/')
})

module.exports = auth
