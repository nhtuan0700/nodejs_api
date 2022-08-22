const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/demo_blog_dev')
    console.log('Connect successfully!')
  } catch (error) {
    console.error('Connect failure!')
  }
}

mongoose.connection.on('connected', () => {
  console.log('Mongo db connected')
})
mongoose.connection.on('error', (err) => {
  console.log(err.message)
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo db disconnected!')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})

module.exports = { connect }
