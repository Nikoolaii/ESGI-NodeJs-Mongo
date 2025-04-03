const { Schema } = require("mongoose");
const mongoose = require("mongoose")

// Important minuscule pour le nom du schema
const user = new Schema({
  email: {
    Type: String,
    Unique: true,
    Validate: function (v) {
      return /^(.+)@(.+)$/.test(v)
    }
  },
  password: String
})

// Important ici la majuscule
const User = mongoose.model('User', user)

module.exports = User;