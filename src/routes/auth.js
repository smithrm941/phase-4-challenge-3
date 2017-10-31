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
          res.render('index', {albums, reviews, user: req.session.user})
        }
      })
    }
  })
})

auth.get('/signin', (req, res) => {
  res.render('signin', {user: null})
})

auth.post('/signin', (req, res) => {
  userData = req.body
  const {email, password} = userData
  db.findExistingUser(userData, (error, authenticatedUser) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      req.session.user = authenticatedUser
      res.redirect('/')
    }
  })
})

auth.get('/signup', (req, res) => {
  res.render('signup', {user: null})
})

auth.post('/signup', (req, res) => {
  userData = req.body
  const {name, email, password} = userData
  db.createUser(userData, (error, newUser) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      req.session.user = newUser
      res.redirect('/')
    }
  })
})

auth.get('/signout', (req, res) => {
 req.session.user = null
 res.redirect('/')
})

module.exports = auth
