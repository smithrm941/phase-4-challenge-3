const checkLogIn = (req, res, next) => {
  if(!req.session.user) {
    res.render('signin', {user: null})
  } else {
    next()
  }
}

module.exports = {checkLogIn}
