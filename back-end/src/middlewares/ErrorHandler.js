const errorHandler = (err, _req, res, _next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
}

module.exports = { errorHandler }
