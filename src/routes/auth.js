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

auth.get('/signup', (req, res) => {
  res.render('signup')
})

module.exports = auth
