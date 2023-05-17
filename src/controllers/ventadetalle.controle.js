const {getConnection,sql} = require('../database/connection');

const getventaDetalle = async (req,res) => {
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request().query('Select * from VentaDetalle');
        console.log(respuesta.recordset);
        
        await pool.close();
        if(respuesta.rowsAffected[0] > 0) {
            res.json(respuesta.recordset);
        }else {
            res.status(500);
            res.send('Error Venta Detalle no disponible')
        }
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const getventaDetalleById = async (req,res) => {
    const {id} = req.params;
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_venta_detalle',sql.Int, id) 
        .query('select * from VentaDetalle where id_venta_detalle =  @id_venta_detalle');
        console.log(respuesta.recordset);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json(respuesta.recordset);
        }else{
            res.status(500);
            res.send('Error Venta Detalle no disponible')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }V}

const createVentaDetalle = async (req,res) => {
    const {id} = req.params;

    console.log(req.body);        

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('cantidad',sql.Int, data.cantidad)
        .input('id_producto',sql.Int, data.id_producto)
        .input('id_venta',sql.Int, data.id_venta)

        
        .query('Insert into VentaDetalle (cantidad, id_producto, id_venta) VALUES (@cantidad,@id_producto, @id_venta)');
        console.log(respuesta.output);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json("Venta creado");
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

const updateVentaDetalle = async (req,res) => {
    console.log(req.body);
    const {id} = req.params;


    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('id_venta_detalle',sql.Int, id)
        .input('cantidad',sql.Int, data.cantidad)
        .input('id_producto',sql.Int, data.id_producto)
        .input('id_venta',sql.Int, data.id_venta)

        .query("update Usuario set cantidad = @cantidad, id_producto = @id_producto, id_venta = @id_venta where id_venta_detalle = @id_venta_detalle");
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.json("Usuario actualizado");
        }else{
            res.status(500);
            res.send('Error al actualizar');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const deleteVentaDetalle = async(req,res) => {
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_venta_detalle',sql.Int, id) 
        .query('delete from VentaDetalle where id_venta_detalle = @id_venta_detalle');
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.send('Usuario eliminado')
        }else {
            res.status(500);
            res.send('Error al eliminar')

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
    view: getventaDetalle,
    viewById: getventaDetalleById,
    create: createVentaDetalle,
    update: updateVentaDetalle,
    delete: deleteVentaDetalle
}
