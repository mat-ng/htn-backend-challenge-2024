module.exports = (error, req, res, next) => {
  if (!error.status) {
    error.status = 500;
    error.message = 'Internal Server Error';
  }

  res.status(error.status);
  res.json({ message: error.message });
}
