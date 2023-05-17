const router = require('express').Router();

const venta = require('../controllers/venta.controler');



router.get('/ventas',venta.view);//Ver venta

router.get('/venta/:id',venta.viewById);//Ver 1 venta

router.post('/venta',venta.create);//Crear venta

router.put('/venta/:id',venta.update);//Editar venta

router.delete('/venta/:id',venta.delete);//Eliminar venta



module.exports = router