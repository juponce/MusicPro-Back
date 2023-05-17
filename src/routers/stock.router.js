const router = require('express').Router();

const stock = require('../controllers/stock.controler');



router.get('/stocks',stock.view);//Ver stock

router.get('/stock/:id',stock.viewById);//Ver 1 stock

router.post('/stock',stock.create);//Crear stock

router.put('/stock/:id',stock.update);//Editar stock

router.delete('/stock/:id',stock.delete);//Eliminar stock



module.exports = router