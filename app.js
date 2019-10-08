let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let app = express()

const url = 'mongodb+srv://teste:teste123@aventurese-bs7vg.mongodb.net/admin?retryWrites=true&w=majority'
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 10, useNewUrlParser: true }

mongoose.connect(url, options)
mongoose.set('useCreateIndex', true)

mongoose.connection.on('error', (err) => {
    console.log('Erro ao conectar no banco mongo: '+err)
})

mongoose.connection.on('disconnected', () => {
    console.log('App desconectou')
})

mongoose.connection.on('connected', () => {
   if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) mongoose.connection.db = mongoose.connection.client.db('Aventurese')
   console.log('Banco conectado')
})

let location = require('./models/location')()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
let routes = require('./routes/routes.js')(app)
 
let server = app.listen(3000, function () {
   console.log('App ligado na porta %s...', server.address().port)
})
