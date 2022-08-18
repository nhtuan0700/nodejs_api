module.exports = function sortMiddleware(req, res, next) {
  res.locals._sort = {
    enable: false,
    type: 'default',
  }
  if (req.query.hasOwnProperty('_sort')) {
    req.query.type = ['asc', 'desc'].includes(req.query.type)
      ? req.query.type
      : 'desc'
    Object.assign(res.locals._sort, {
      enable: true,
      type: req.query.type,
      column: req.query.column,
    })
  }
  next()
}
