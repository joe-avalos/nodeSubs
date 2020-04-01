module.exports.asyncWrapper = function asyncWrapper(fn) {
  return (res, req, next) => fn(req, res).catch(next)
}
