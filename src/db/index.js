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
	    albums.title, users.name AS review_author, reviews.*
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

//Album page queries:
function getAlbumsByID(albumID, cb) {
  _query('SELECT * FROM albums WHERE id = $1', [albumID], cb)
}

//User page queries:
function getUserByID(userID, cb) {
  _query('SELECT * FROM users WHERE id = $1', [userID], cb)
}

function getReviewsByUserID(userID, cb) {
  _query(`SELECT
            reviews.*, albums.*
          FROM
            reviews, users, albums
          WHERE
            reviews.album_id = albums.id
          AND
            reviews.author_id = users.id
          AND
            reviews.author_id = $1`, [userID], cb)
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
  getAlbumsByID,
  getUserByID,
  getReviewsByUserID
}
