const router = require('express').Router();

const bodega = require('../controllers/bodega.controler');




router.get('/bodegas',bodega.view);//Ver todos los bodega 

router.get('/bodega/:id',bodega.viewById);//Ver 1 bodega

router.post('/bodega',bodega.create);//Crear bodega

router.put('/bodega/:id',bodega.update);//Editar bodega

router.delete('/bodega/:id',bodega.delete);//Eliminar bodega


module.exports = router