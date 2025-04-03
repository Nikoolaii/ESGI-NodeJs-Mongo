const { Schema } = require("mongoose")
const mongoose = require("mongoose")

// Important minuscule pour le nom du schema
const user = new Schema({
  email: {
    type: String,
  },
  password: String,
  roles: Array
})

// Important ici la majuscule
const User = mongoose.model('User', user)

module.exports = User;