const router = require('express').Router();

const usuario = require('../controllers/usuario.controler');



router.get('/usuarios',usuario.view);//Ver usuario

router.get('/usuario/:id',usuario.viewById);//Ver 1 usuario

router.post('/usuario',usuario.create);//Crear usuario

router.put('/usuario/:id',usuario.update);//Editar usuario

router.delete('/usuario/:id',usuario.delete);//Eliminar usuario



module.exports = router