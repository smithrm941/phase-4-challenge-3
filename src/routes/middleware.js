const checkLogIn = (req, res, next) => {
  if(!req.session.user) {
    res.render('signin', {loggedInUser: null})
  } else {
    next()
  }
}

module.exports = {checkLogIn}
