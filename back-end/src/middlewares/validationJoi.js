// ref: https://dev.to/tayfunakgc/middleware-based-joi-validation-in-expressjs-2po5
const validationJoi = (schema) => {
  return function(req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) return res.status(404).json({ message: error.message });
    next();
  }
}

module.exports = {
  validationJoi,
};
