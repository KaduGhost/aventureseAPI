require('dotenv').config()
let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let cors = require('cors')
let app = express()

const url = process.env.MONGO_URL
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

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
let routes = require('./routes/routes.js')(app)
 
let server = app.listen(3000, function () {
    console.log(process.env.APP_URL)
    console.log('App na porta %s...', server.address().port)
})
