const {
  mutipleMongooseToObject,
  mongooToObject,
} = require('../../util/mongoose')
const Course = require('../models/Course')

class CourseController {
  // [GET] /courses
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render('courses/index', {
          courses: mutipleMongooseToObject(courses),
        })
      })
      .catch(next)
  }

  // [Get] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(function (course) {
        res.render('courses/show', { course: mongooToObject(course) })
      })
      .catch(next)
  }

  // [GET] /courses/create
  create(req, res) {
    res.render('courses/create')
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body
    formData.image = 'https://via.placeholder.com/200'
    Course.create(formData)
      .then(() => res.redirect('/'))
      .catch(next)
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findOne({ _id: req.params.id })
      .then((course) =>
        res.render('courses/edit', { course: mongooToObject(course) })
      )
      .catch(next)
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Course.findByIdAndUpdate(req.params.id, req.body)
      .then(res.redirect(`/me/stored/courses`))
      .catch(next)
  }

  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  // [DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }
}

module.exports = new CourseController()
