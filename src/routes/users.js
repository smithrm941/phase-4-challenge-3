const db = require('../db')
const users = require('express').Router()

users.get('/:userID', (req, res) => {
  const userID = req.params.userID

  db.getUsersByID(userID, (error, users) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const user = users[0]
      if(user) {
        db.getReviewsByUserID(user.id, (error, reviews) => {
          if (error) {
            res.status(500).render('error', {error})
          } else {
            res.render('user', {user, reviews, loggedInUser: req.session.user})
          }
        })
      }
    }
  })
})

users.delete('/reviews/delete/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId
  db.deleteReviewsById(reviewId, (error, review) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      res.redirect(`/users/${review[0].author_id}`)
    }
  })
})

module.exports = users
