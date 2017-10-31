const router = require('express').Router()
const auth = require('./auth')
const albums = require('./albums')

router.use('/', auth)
router.use('/albums', albums)
