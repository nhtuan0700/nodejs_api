const courseRouter = require('./courses')
const meRouter = require('./me')
const newsRouter = require('./news')
const siteRouter = require('./site')

function route(app) {
  // site: home, search, contact, search
  app.use('/courses', courseRouter)
  app.use('/me', meRouter)
  app.use('/news', newsRouter)
  app.use('/', siteRouter)
}

module.exports = route
