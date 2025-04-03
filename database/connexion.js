const mongoose = require("mongoose")

const connect = async () => {
  try {
    let db = await mongoose.connect("mongodb://root:example@localhost:27017/")
    console.log("Database up")
  } catch (error) {
    console.log("Connexion error : " + error)
  }
}

module.exports = { connect }