let mongoose = require('mongoose')
let Schema = mongoose.Schema

let LocationModel = function() {
   let LocationSchema = new Schema({
      nome: String,
      descricao: String,
      icone: String,
      imagem: String,
      endereco: String,
      local: {
         type: [Number],
         index: '2d'
      }
   }, 
   { collection : 'locais' })
   mongoose.model('Location', LocationSchema)
}

module.exports = LocationModel