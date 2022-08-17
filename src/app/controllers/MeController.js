const { mutipleMongooseToObject } = require('../../util/mongoose')
const Course = require('../models/Course')

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}), Course.countDeleted()]).then(
      ([courses, countDeleted]) => {
        res.render('me/stored-course', {
          countDeleted,
          courses: mutipleMongooseToObject(courses),
        })
      }
    )
  }

  // [GET] /me/stored/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render('me/trash-course', {
          courses: mutipleMongooseToObject(courses),
        })
      })
      .catch(next)
  }
}

module.exports = new MeController()
