let locationController = require('../controllers/locationController')

let appRouter = function(app) {
   app.get('/locais', locationController.listaLocais)
   app.get('/local', locationController.local)
   app.post('/local', locationController.adicionar)
   app.get('/apagartudo', locationController.apagartudo)
   app.get('/apagar', locationController.apagar)
   app.get('/enchertudo', locationController.enchertudo)
}
 
module.exports = appRouter
