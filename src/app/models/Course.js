const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')
const slug = require('mongoose-slug-generator')

const Schema = mongoose.Schema

const Course = new Schema(
  {
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    slug: { type: String, slug: 'name', unique: true },
    image: { type: String, maxLength: 255 },
  },
  {
    timestamps: true,
  }
)

// Add plugin
Course.plugin(mongoose_delete, {
  overrideMethods: 'all',
  deletedAt: true,
})
mongoose.plugin(slug)

// params 1: auto find courses collection, not course
module.exports = mongoose.model('Course', Course)
