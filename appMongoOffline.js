let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let app = express()

let location = require('./models/location')()

const url = 'mongodb://localhost:27017/sampledb'
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 10, useNewUrlParser: true }

mongoose.connect(url, options)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
 
let routes = require('./routes/routes.js')(app)
 
let server = app.listen(3000, function () {
   console.log('Listening on port %s...', server.address().port)
})
