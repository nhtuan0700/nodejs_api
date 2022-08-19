const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

const CourseSchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    slug: { type: String, slug: 'name', unique: true },
    image: { type: String, maxLength: 255 },
  },
  {
    _id: false,
    timestamps: true,
  }
)

// Add plugin
CourseSchema.plugin(AutoIncrement, {
  collection_name: 'course_counters',
})
CourseSchema.plugin(mongoose_delete, {
  overrideMethods: 'all',
  deletedAt: true,
})
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    })
  }
  return this
}

mongoose.plugin(slug)

// params 1: auto find courses collection, not course
module.exports = mongoose.model('Course', CourseSchema)
