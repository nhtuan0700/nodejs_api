module.exports = {
  mutipleMongooseToObject(mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject())
  },
  mongooToObject(mongoose) {
    return mongoose ? mongoose.toObject() : mongoose
  },
}
