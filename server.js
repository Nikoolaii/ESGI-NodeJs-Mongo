const http = require('http')
const app = require('./app')

const port = process.env.PORT || 3000

const server = http.createServer(app)
server.on('error', (error) => {
  console.error('An error occurred:', error.message)
  process.exit(1)
})

server.on('listening', () => {
  console.log('Server is listening on port', port)
})
server.listen(port)