const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
// HTTP LOGGER
app.use(morgan('combined'))

// Template engine
// hbs: all views ignore layout
app.engine('hbs', handlebars.engine({
  extname: '.hbs', // layout
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

const port = 3000
// route
app.get('/', (req, res) => res.render('home'))
app.get('/news', (req, res) => res.render('news'))

// 127.0.0.1 - localhost
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))