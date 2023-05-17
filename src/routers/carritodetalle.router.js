const router = require('express').Router();

const carritoDetalle = require('../controllers/carritodetalle.controler');



router.get('/carritosDetalle',carritoDetalle.view);//Ver carrito

router.get('/carritoDetalle/:id',carritoDetalle.viewById);//Ver 1 carrito

router.post('/carritoDetalle',carritoDetalle.create);//Crear carrito

router.put('/carritoDetalle/:id',carritoDetalle.update);//Editar carrito

router.delete('/carritoDetalle/:id',carritoDetalle.delete);//Eliminar carrito



module.exports = router