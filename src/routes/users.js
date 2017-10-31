const db = require('../db')
const users = require('express').Router()

users.get('/:userID', (req, res) => {
  const userID = req.params.userID

  db.getUserByID(userID, (error, users) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const user = users[0]
      if(user) {
        db.getReviewsByUserID(user.id, (error, reviews) => {
          if (error) {
            res.status(500).render('error', {error})
          } else {
            res.render('user', {user, reviews})  
          }
        })
      }
    }
  })
})

module.exports = users
