const router = require('express').Router();

const ventadetalle = require('../controllers/ventadetalle.controle');



router.get('/ventasdetalles',ventadetalle.view);//Ver ventadetalle

router.get('/ventadetalle/:id',ventadetalle.viewById);//Ver 1 ventadetalle

router.post('/ventadetalle',ventadetalle.create);//Crear ventadetalle

router.put('/ventadetalle/:id',ventadetalle.update);//Editar ventadetalle

router.delete('/ventadetalle/:id',ventadetalle.delete);//Eliminar ventadetalle



module.exports = router