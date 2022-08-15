const Course = require('../models/Course.js')

class NewsController {
  // [GET] /news
  index(req, res) {
    // res.render('news')
    Course.find({}, (err, courses) => {
      if (!err) {
        res.json(courses)
      } else {
        console.log('Error: ', err)
      }
    })
  }

  // GET /news/:id
  show(req, res) {
    res.send('News show!!' + req.params.id)
  }
}

module.exports = new NewsController()
