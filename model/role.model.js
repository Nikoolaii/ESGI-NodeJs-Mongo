const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const role = new Schema({
  label: String
})

const Role = mongoose.model('Role', role)

module.exports = Role