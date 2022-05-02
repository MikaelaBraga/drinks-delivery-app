const validateBody = (req, res, next) => {
  const { name, email, password } = req.body;
  const regex = /^(.+)@(.+)$/;
  const verifyEmail = email.match(regex);

  if (name.length < 12) {
    return res.status(400).json({ message: '"name" length must be at least 8 characters long' });
  }

  if (!verifyEmail) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

module.exports = {
  validateBody,
}