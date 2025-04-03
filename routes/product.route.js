const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /product'
  })
  next()
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id: id
    })
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    })
  }
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  res.status(201).json({
    message: 'Handling POST requests to /product'
  })
})

module.exports = router