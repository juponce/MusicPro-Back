const {getConnection,sql} = require('../database/connection');

const getCarritoDetalle = async (req,res) => {
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request().query('select * from CarritoDetalle');
        console.log(respuesta.recordset);
        
        await pool.close();
        if(respuesta.rowsAffected[0] > 0) {
            res.json(respuesta.recordset);
        }else {
            res.status(500);
            res.send('Error de consulta')
        }
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const getCarritoDetalleById = async (req,res) => {
    const {id} = req.params;
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_carrito_detalle',sql.Int, id) 
        .query('select * from CarritoDetalle where id_carrito_detalle =   @id_carrito_detalle');
        console.log(respuesta.recordset);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json(respuesta.recordset);
        }else{
            res.status(500);
            res.send('Error carrito detalle no disponible')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }}

const createCarritoDetalle = async (req,res) => {

    console.log(req.body);        

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('cantidad',sql.Int, data.cantidad)
        .input('id_producto',sql.Int, data.id_producto)
        .input('id_carrito',sql.Int, data.id_carrito)
        .query('insert into CarritoDetalle (cantidad,id_producto,id_carrito) values (@cantidad,@id_producto, @id_carrito)');
        console.log(respuesta);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.send('Carrito detalle detalle creado')
        }else{
            res.status(500);
            res.send('Error al crear la Venta')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const updateCarritoDetalle = async (req,res) => {
    console.log(req.body);
    const {id} = req.params;

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('id_carrito_detalle',sql.Int, id)
        .input('cantidad',sql.Int, data.cantidad)
        .input('id_producto',sql.Int, data.id_producto)
        .input('id_carrito',sql.Int, data.id_carrito)
        .query("update CarritoDetalle set cantidad = @cantidad, id_producto = @id_producto, id_carrito = @id_carrito where id_carrito_detalle =  @id_carrito_detalle");
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.json("Carrito actualizado");
        }else{
            res.status(500);
            res.send("Error al actualizar");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const deleteCarritoDetalle = async(req,res) => {
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_carrito_detalle',sql.Int, id) 
        .query('delete from CarritoDetalle where id_carrito_detalle = @id_carrito_detalle');
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.send("Carrito detalle eliminado")
        }else {
            res.status(500);
            res.send("Error al eliminar")

        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const fechaActual = () => {
    var today = new Date();
    
    var day = today.getDate();
    
    var month = today.getMonth() + 1;
    
    var year = today.getFullYear();
    
    return `${month}/${day}/${year}`
}


module.exports = {
    view: getCarritoDetalle,
    viewById: getCarritoDetalleById,
    create: createCarritoDetalle,
    update: updateCarritoDetalle,
    delete: deleteCarritoDetalle
}
