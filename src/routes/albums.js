const db = require('../db')
const albums = require('express').Router()

albums.get('/:albumID', (req, res) => {
  const { albumID } = req.params

  db.getAlbumsByID(albumID, (error, retrievedAlbums) => {
    if (error) {
      res.status(500).render('error', { error })
    } else {
      const album = retrievedAlbums[0]
      if (album) {
        db.getReviewsByAlbumID(album.id, (error, reviews) => {
          if (error) {
            res.status(500).render('error', { error })
          } else {
            res.render('album', { album,
              reviews,
              loggedInUser: req.session.user })
          }
        })
      }
    }
  })
})

albums.get('/:albumID/reviews/new', (req, res) => {
  const { albumID } = req.params
  db.getAlbumsByID(albumID, (error, retrievedAlbums) => {
    if (error) {
      res.status(500).render('error', { error })
    } else {
      const album = retrievedAlbums[0]
      res.render('new_review', { album,
        loggedInUser: req.session.user,
        message: '' })
    }
  })
})

albums.post('/:albumId/reviews/new', (req, res) => {
  const { albumId } = req.params
  const { content } = req.body
  const author = req.session.user.id
  const newReview = { content, album_id: albumId, author }
  if (!newReview.content) {
    db.getAlbumsByID(albumId, (error, retrievedAlbums) => {
      if (error) {
        res.status(500).render('error', { error, loggedInUser: req.session.user })
      } else {
        const album = retrievedAlbums[0]
        res.render('new_review', { album,
          loggedInUser: req.session.user,
          message: 'Cannot submit a blank review' })
      }
    })
  } else {
    db.createReview(newReview, (error) => {
      if (error) {
        res.status(500).render('error', { error })
      } else {
        res.redirect(`/albums/${albumId}`)
      }
    })
  }
})

albums.delete('/reviews/delete/:reviewId', (req, res) => {
  const { reviewId } = req.params
  db.deleteReviewsById(reviewId, (error, review) => {
    if (error) {
      res.status(500).render('error', { error })
    } else {
      res.redirect(`/albums/${review[0].album_id}`)
    }
  })
})

module.exports = albums
