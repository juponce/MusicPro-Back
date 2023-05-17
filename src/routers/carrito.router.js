const router = require('express').Router();

const carrito = require('../controllers/carrito.controler');



router.get('/carritos',carrito.view);//Ver carrito

router.get('/carrito/:id',carrito.viewById);//Ver 1 carrito

router.post('/carrito',carrito.create);//Crear carrito

router.put('/carrito/:id',carrito.update);//Editar carrito

router.delete('/carrito/:id',carrito.delete);//Eliminar carrito



module.exports = router