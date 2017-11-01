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
          res.render('index', {albums, reviews, loggedInUser: req.session.user})
        }
      })
    }
  })
})

auth.get('/signin', (req, res) => {
  res.render('signin', {loggedInUser: null, message: ''})
})

auth.post('/signin', (req, res) => {
  userData = req.body
  const {email, password} = userData
  db.findExistingUser(userData, (error, currentUser) => {
    let authenticatedUser = currentUser[0]
    if (error) {
      res.status(500).render('error', {error})
    } else {
      if(!authenticatedUser){
        res.render('signin', {loggedInUser: null, message: 'Incorrect email or password.'})
      } else {
        req.session.user = authenticatedUser
        res.redirect('/')
      }
    }
  })
})

auth.get('/signup', (req, res) => {
  res.render('signup', {loggedInUser: null})
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
