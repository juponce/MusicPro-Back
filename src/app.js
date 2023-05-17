//Import 
const express = require('express');
const cors = require('cors');
const app = express();

const productoRoutes = require('./routers/producto.router');
const usuarioRoutes = require('./routers/usuario.router');
const ventaRoutes = require('./routers/venta.router');
const ventaDetalleRoutes = require('./routers/ventadetalle.router');
const stockRoutes = require('./routers/stock.router');
const bodegaRoutes = require('./routers/bodega.router');
const carritoRoutes = require('./routers/carrito.router');
const carritoDetalleRoutes = require('./routers/carritodetalle.router');

app.use(express.json());//acepta Json
app.use(express.urlencoded({extended: false}))//acepta datos de formularios
app.use(cors({ origin: '*' }));
app.use(productoRoutes);
app.use(usuarioRoutes);
app.use(ventaRoutes);
app.use(ventaDetalleRoutes);
app.use(stockRoutes);
app.use(bodegaRoutes);
app.use(carritoRoutes);
app.use(carritoDetalleRoutes);



//Export modulo app
module.exports = app
