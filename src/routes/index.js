const router = require('express').Router()
const auth = require('./auth')
const albums = require('./albums')
const users = require('./users')

router.use('/', auth)
router.use('/albums', albums)
router.use('/users', users)


module.exports = router
