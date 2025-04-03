const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1]

  if (!token) {
    res.status(401).json({
      'message': 'You must be logged in to do this action.'
    })
    return;
  }

  try {
    req.token = jwt.verify(token, "mysecretkey")
  } catch (e) {
    res.status(401).json({
      'message': 'Your credentials are not valid.'
    })
  }

  next()
}