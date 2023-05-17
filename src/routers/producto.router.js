const router = require('express').Router();

const producto = require('../controllers/producto.controler');



router.get('/productoStock',producto.viewStock);//Ver todos los productos con stock

router.get('/productos',producto.view);//Ver todos los productos 

router.get('/producto/:id',producto.viewById);//Ver 1 producto

router.post('/producto',producto.create);//Crear producto

router.put('/producto/:id',producto.update);//Editar producto

router.delete('/producto/:id',producto.delete);//Eliminar producto


module.exports = router