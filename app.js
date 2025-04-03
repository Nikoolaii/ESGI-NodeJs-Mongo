const express = require('express')
const { connect } = require('./database/connexion')

const app = express()
app.use(express.json())

const database = async () => {
  await connect()
}
database()

const productRoute = require('./routes/product.route')
const authRoute = require('./routes/auth.route')
const authMiddleware = require('./middlewares/auth.middleware')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-')
  next()
})

app.use('/product', authMiddleware, productRoute)
app.use('/auth', authRoute)

app.use('/user', (req, res, next) => {
  console.log('This only runs on /user');
})

module.exports = app