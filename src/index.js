const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const db = require('./config/db')
var methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/sortMiddleware')
const router = require('./routes')
const createError = require('http-errors')

const app = express()
// overide method
app.use(methodOverride('_method'))

// Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))
// HTTP LOGGER
// app.use(morgan('combined'))

// Template engine
// hbs: all views ignore layout
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs', // layout,
    helpers: require('./helpers/handlebars'),
  })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Custom middleware
app.use(SortMiddleware)

// Connect db
db.connect()
const port = 3000

// Init route
app.get('/', (req, res, next) => {
  next(createError.InternalServerError('ABC'))
})
app.use('/', router)

app.use((req, res, next) => {
  res.status(404)
  next(createError(404, 'Invalid router'))
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status)
  res.json({
    status: status,
    error: err.message,
  })
})
// 127.0.0.1 - localhost
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
