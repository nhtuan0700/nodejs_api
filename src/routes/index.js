const express = require('express')
const courseRouter = require('./courses')
const meRouter = require('./me')
const newsRouter = require('./news')
const siteRouter = require('./site')

const router = express.Router()
// site: home, search, contact, search
router.use('/courses', courseRouter)
router.use('/me', meRouter)
router.use('/news', newsRouter)
router.use('/', siteRouter)

module.exports = router
