const db = require('../db')
const albums = require('express').Router()

albums.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      if(album) {
        db.getReviewsByAlbumID(album.id, (error, reviews) => {
          if (error) {
            res.status(500).render('error', {error})
          } else {
            res.render('album', {album, reviews, loggedInUser: req.session.user})
          }
        })
      }
    }
  })
})

albums.get('/:albumID/reviews/new', (req, res) => {
  const albumID = req.params.albumID
  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      res.render('new_review', {album, loggedInUser: req.session.user, message: ''})
    }
  })
})

albums.post('/:albumID/reviews/new', (req, res) => {
  const albumId = req.params.albumID
  const content = req.body.content
  const author = req.session.user.id
  const newReview = {content: content, album: albumId, author: author}
  if(!newReview.content) {
    db.getAlbumsByID(albumId, (error, albums) => {
      if (error) {
        res.status(500).render('error', {error, loggedInUser: req.session.user})
      } else {
        const album = albums[0]
        res.render('new_review', {album, loggedInUser: req.session.user, message: 'Cannot submit a blank review'})
      }
    })
  } else {
    db.createReview(newReview, (error, newReview) => {
      if (error) {
        res.status(500).render('error', {error})
      } else {
        res.redirect(`/albums/${albumId}`)
      }
    })
  }
})

albums.delete('/reviews/delete/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId
  db.deleteReviewsById(reviewId, (error, review) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      res.redirect(`/albums/${review[0].album_id}`)
    }
  })
})

module.exports = albums
