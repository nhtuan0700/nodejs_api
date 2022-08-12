const newsRouter = require('./news')
const siteRouter = require('./site')

function route(app) {
  // site: home, search, contact, search
  app.use('/news', newsRouter)
  app.use('/', siteRouter)
}

module.exports = route
