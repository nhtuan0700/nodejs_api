const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/demo_blog_dev')
    console.log('Connect successfully!')
  } catch (error) {
    console.error('Connect failure!')
  }
}

module.exports = { connect }
