const { Schema } = require("mongoose");
const mongoose = require("mongoose")

// Important minuscule pour le nom du schema
const user = new Schema({
  email: String,
  password: String
})

// Important ici la majuscule
const User = mongoose.model('User', user)

module.exports = User;