const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (role) => {
  return (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1]

    if (!token) {
      res.status(401).json({
        'message': 'You must be logged in to do this action.',
        success: false
      })
      return
    }

    try {
      req.token = jwt.verify(token, process.env.JWT_SECRET)
      if (!req.token.roles.includes(role)) {
        res.status(403).json({
          'message': 'You are not authorized to do this action.',
          success: false
        })
        return
      }
    } catch (e) {
      res.status(401).json({
        'message': 'Your credentials are not valid.',
        success: false
      })
    }

    next()
  }
} 