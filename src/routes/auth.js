const db = require('../db')
const auth = require('express').Router()

auth.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      db.getRecentReviews((error, reviews) => {
        if (error) {
          res.status(500).render('error', {error})
        } else {
          console.log('here are the reviews::::', reviews)
          res.render('index', {albums, reviews})
        }
      })
    }
  })
})

auth.get('/signin', (req, res) => {
  res.render('signin')
})

auth.post('/signin', (req, res) => {
  userData = req.body
  const {email, password} = userData
  db.findExistingUser(userData, (error, authenticatedUser) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      res.redirect('/')
    }
  })
})

auth.get('/signup', (req, res) => {
  res.render('signup')
})

auth.post('/signup', (req, res) => {
  userData = req.body
  const {name, email, password} = userData
  db.createUser(userData, (error, newUser) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      res.redirect('/')
    }
  })
})

module.exports = auth
