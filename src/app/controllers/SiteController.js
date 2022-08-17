class SiteController {
  // [GET] /
  index(req, res, next) {
    res.render('home')
  }

  // [GET] /about
  about(req, res) {
    res.render('about')
  }
}

module.exports = new SiteController()
