const db = require('../db')
const users = require('express').Router()

users.get('/:userID', (req, res) => {
  const { userID } = req.params
  db.getUsersByID(userID, (error, retrievedUsers) => {
    if (error) {
      res.status(500).render('error', { error, loggedInUser: req.session.user })
    } else {
      const profile = retrievedUsers[0]
      if (profile) {
        db.getReviewsByUserID(profile.id, (error, reviews) => {
          if (error) {
            res.status(500).render('error', { error, loggedInUser: req.session.user })
          } else {
            res.render('user', { profile, reviews, loggedInUser: req.session.user, message: '' })
          }
        })
      }
    }
  })
})

users.delete('/reviews/delete/:reviewId', (req, res) => {
  const { reviewId } = req.params
  db.deleteReviewsById(reviewId, (error, review) => {
    if (error) {
      res.status(500).render('error', { error })
    } else {
      res.redirect(`/users/${review[0].author_id}`)
    }
  })
})

module.exports = users
