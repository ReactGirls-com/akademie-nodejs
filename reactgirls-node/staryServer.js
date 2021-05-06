import http from 'http'
import fs from 'fs'
// const http = require('http')
// const fs = require('fs')

const PORT = 4000

const index = fs.readFileSync('./public/index.html')
const clanok1 = fs.readFileSync('./public/clanok1.html')
const clanok2 = fs.readFileSync('./public/clanok2.html')

const mojServer = http.createServer(function (request, response) {
  console.log(`Dostali sme request na adresu ${request.url}`)

  response.writeHead(200, {
    'Content-Type': 'text/html'
  })

  if (request.url === '/clanok1.html') {
    response.write(clanok1)
  } else if (request.url === '/clanok2.html') {
    response.write(clanok2)
  } else {
    response.write(index)
  }

  response.end()
})

mojServer.listen(PORT, function () {
  console.log(`Server sa spustil na porte ${PORT}`)
})