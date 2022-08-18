const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')
const slug = require('mongoose-slug-generator')

const Schema = mongoose.Schema

const CourseSchema = new Schema(
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
CourseSchema.plugin(mongoose_delete, {
  overrideMethods: 'all',
  deletedAt: true,
})
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: req.query.type,
    })
  } else {
    return this
  }
}

mongoose.plugin(slug)

// params 1: auto find courses collection, not course
module.exports = mongoose.model('Course', CourseSchema)
