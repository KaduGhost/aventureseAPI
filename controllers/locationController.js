let mongoose = require('mongoose')
let Location = mongoose.model('Location')
let Joi = require('joi')

const fs = require('fs')

module.exports = {

   enchertudo: function(req, res) {
      let locais = JSON.parse(fs.readFileSync('./data/locais.json'))
      let locais2 = []
      let slot = 0
      for (let value of locais) {
         const {nome, descricao, icone, imagem, endereco, local} = value
         locais2[slot++] = {nome, descricao, icone, imagem, endereco, local}
      }
      Location.create(locais2, function(err, result) {
         if (err) {
            console.log(err)
            return
         }
         res.status(200).send("Cadastrados :)")
      })
   },

   apagar: function(req, res) {
      let id = req.query.id
      Location.deleteOne({_id: req.query.id}, req.body, function(err,data) {
          if(!err) {
             res.status(200).send("Deletado :)")
          }
      })
   },

   apagartudo: function(req, res) {
      Location.deleteMany({}, function (err) {
         if (err) return handleError(err)
         res.status(200).json({})
       })
   },
   
   adicionar: function(req, res) {
      let data = req.body
      const schema = Joi.object().keys({
         nome: Joi.string().required(),
         descricao: Joi.string().required(),
         icone: Joi.string().required(),
         imagem: Joi.string().required(),
         endereco: Joi.string().required(),
         latitude: Joi.number().precision(6).required(),
         longitude: Joi.number().precision(6).required(),
      })
      
      Joi.validate(data, schema, (err, value) => {
         if (err) {
             res.status(422).json({
                 status: 'erro',
                 message: 'Requisição inválida',
                 data: data
             })
         }else {
            const {nome, descricao, icone, imagem, endereco, latitude, longitude} = data
	         Location.create({nome, descricao, icone, imagem, endereco, local: [latitude, longitude]}, function(err, result) {
		         res.json({
                  status: 'successo',
                  message: 'Local adicionado',
                  data: result
                })
            })
         }
      })
   },

   local: function(req, res) {
      let id = req.query.id
      let localInicial = req.query.local
      Location.findById(id, (err, locations) => {
         if (err) {
            return res.status(500).json(err)
         }
         const {_id, nome, descricao, icone, imagem, endereco, local} = locations
         res.status(200).json({_id,nome,descricao,icone,imagem,endereco,local,link:`https://m.uber.com/ul/?client_id=xgl5Pt5xCtTvO03A9X49bG8XenyO75Tw&action=setPickup&pickup[latitude]=${localInicial[0]}&pickup[longitude]=${localInicial[1]}&dropoff[latitude]=${local[0]}&dropoff[longitude]=${local[1]}&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`})
      })
   },

   listaLocais: function(req, res) {
      let localInicial = req.query.local
      Location.find({}, (err, locations) => {
         if (err) return res.status(500).json(err)
         let locais = []
         let slot = 0
         for (let value of locations) {
            const { _id, nome, descricao, icone, imagem, endereco, local} = value
            locais[slot++] = {_id,nome,descricao,icone,imagem,endereco,local,link:`https://m.uber.com/ul/?client_id=xgl5Pt5xCtTvO03A9X49bG8XenyO75Tw&action=setPickup&pickup[latitude]=${localInicial[0]}&pickup[longitude]=${localInicial[1]}&dropoff[latitude]=${local[0]}&dropoff[longitude]=${local[1]}&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`}
         }
         res.status(200).json(locais)
      })
   },

}
