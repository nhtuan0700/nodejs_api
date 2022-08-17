const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const route = require('./routes')
const db = require('./config/db')
var methodOverride = require('method-override')

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
    helpers: {
      sum: (a, b) => a + b,
    },
  })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Connect db
db.connect()
const port = 3000

// Init route
route(app)

// 127.0.0.1 - localhost
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
