const checkLogIn = (req, res, next) => {
  if(!req.session.user) {
    res.render('signin', {loggedInUser: null, message: 'Please sign in'})
  } else {
    next()
  }
}

module.exports = {checkLogIn}
