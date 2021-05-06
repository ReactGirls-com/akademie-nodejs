import express from 'express'
const app = express()

const PORT = 4000

app.use(function (request, response, next) {
  console.log(`Dostali sme request typu ${request.method} na adresu ${request.url}`)
  next()
})

app.use(express.static('public'))

app.use(express.json())

let messages = [
  {
    id: 1,
    text: 'FIRST!!!!'
  },
  {
    id: 2,
    text: 'Hello everyone'
  }
]

let posledneId = 2

app.get('/messages', function (request, response) {
  response.status(200)
  response.send(messages)
})

app.get('/messages/:idcko', function (request, response) {
  const idcko = Number(request.params.idcko)

  const spravaPodId = messages.find((element) => element.id === idcko)

  response.status(200)
  response.send(spravaPodId)
})

app.post('/messages', function (request, response) {
  posledneId = posledneId + 1

  const novaSprava = {
    id: posledneId,
    text: request.body.text
  }

  messages.push(novaSprava)

  response.status(201)
  response.send(novaSprava)
})

app.delete('/messages/:idcko', function (request, response) {
  const idNaZmazanie = Number(request.params.idcko)

  console.log(`Mazem spravu s id ${idNaZmazanie}`)

  messages = messages.filter((element) => element.id !== idNaZmazanie)

  response.status(204)
  response.end()
});

app.listen(PORT, function () {
  console.log(`Server bezi na porte ${PORT}`)
})