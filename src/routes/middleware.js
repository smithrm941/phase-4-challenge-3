const checkLogIn = (req, res, next) => {
  if(!req.session.id) {
    res.render('signin')
  } else {
    next()
  }
}

module.exports = {checkLogIn}
