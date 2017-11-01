const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

//Home page queries:
function getAlbums(cb) {
  _query('SELECT * FROM albums', [], cb)
}

function getRecentReviews(cb) {
  _query(
    `SELECT
	    albums.title, users.name AS author_name, reviews.*
     FROM
	    reviews, users, albums
     WHERE
	    reviews.album_id = albums.id
     AND
	    reviews.author_id = users.id
     ORDER BY
	    review_date DESC
     LIMIT 3;`, [], cb)
}

//Sign up queries:
function checkDatabaseForEmail(userData, cb) {
  _query(
    `SELECT
      *
    FROM
     users
    WHERE
     email = $1`, [userData.email], cb)
}
function createUser(userData, cb) {
  _query(
    `INSERT INTO
      users (name, email, password)
     VALUES
      ($1, $2, $3)
     RETURNING
      *`, [userData.name, userData.email, userData.password], cb)
}

//Sign in query:
function authenticateExistingUser(userData, cb) {
  _query(
    `SELECT
      * FROM users
     WHERE
      email = $1 AND password = $2`, [userData.email, userData.password], cb)
}

//Album page queries:
function getAlbumsByID(albumID, cb) {
  _query('SELECT * FROM albums WHERE id = $1', [albumID], cb)
}

function getReviewsByAlbumID(albumID, cb) {
  _query(
    `SELECT
      reviews.id AS review_id, reviews.review_date, reviews.content, reviews.author_id, users.name AS author_name, albums.id, albums.title, albums.artist
    FROM
      reviews, users, albums
    WHERE
      reviews.album_id = albums.id
    AND
      reviews.author_id = users.id
    AND
      reviews.album_id = $1
    ORDER BY
      review_date DESC`, [albumID], cb)
}

//New review page queries:
function createReview(newReview, cb) {
  _query(
    `INSERT INTO
      reviews (content, author_id, album_id)
     VALUES
      ($1, $2, $3)`, [newReview.content, newReview.author, newReview.album], cb)
}


//User page queries:
function getUsersByID(userID, cb) {
  _query('SELECT * FROM users WHERE id = $1', [userID], cb)
}

function getReviewsByUserID(userID, cb) {
  _query(
    `SELECT
      reviews.id AS review_id, reviews.review_date, reviews.content, reviews.author_id, users.name AS author_name, albums.id, albums.title, albums.artist
     FROM
      reviews, users, albums
     WHERE
      reviews.album_id = albums.id
     AND
      reviews.author_id = $1
     AND
      reviews.author_id = users.id
     ORDER BY
      review_date DESC`, [userID], cb)
}

//Deleting review queries:
function deleteReviewsById(id, cb) {
  _query(
    `DELETE FROM
      reviews
     WHERE
      id = $1
     RETURNING
      *;`, [id], cb)
}

function _query(sql, variables, cb) {
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, (error, result) => {
    if (error) {
      console.log('QUERY -> !!ERROR!!')
      console.error(error)
      cb(error)
    } else {
      console.log('QUERY ->', JSON.stringify(result.rows))
      cb(error, result.rows)
    }
  })
}

module.exports = {
  getAlbums,
  getRecentReviews,
  checkDatabaseForEmail,
  createUser,
  authenticateExistingUser,
  getAlbumsByID,
  getReviewsByAlbumID,
  createReview,
  getUsersByID,
  getReviewsByUserID,
  deleteReviewsById
}
