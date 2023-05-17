const {getConnection,sql} = require('../database/connection');

const getventa = async (req,res) => {
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request().query('Select * from Venta');
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

const getventaById = async (req,res) => {
    const {id} = req.params;
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_venta',sql.Int, id) 
        .query('select * from Venta where id_venta =  @id_venta');
        console.log(respuesta.recordset);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json(respuesta.recordset);
        }else{
            res.status(500);
            res.send('Error usuario no disponible')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }}

const createVenta = async (req,res) => {

    console.log(req.body);        

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('total_venta',sql.Int, data.total_venta)
        .input('orden_compra',sql.VarChar, data.orden_compra)
        .input('fecha_creacion',sql.SmallDateTime, fechaActual())
        .input('correo',sql.VarChar, data.correo)
        .query('Insert into Venta (total_venta, orden_compra, fecha_venta, correo)OUTPUT inserted.id_venta VALUES (@total_venta,@orden_compra,@fecha_creacion, @correo)');
        console.log(respuesta);
        const idVenta = respuesta.recordset[0].id_venta;

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json(idVenta);


            ///////////////////
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

const updateVenta = async (req,res) => {
    console.log(req.body);
    const {id} = req.params;

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('id_venta',sql.Int, id)
        .input('total_venta',sql.Int, data.total_venta)
        .input('orden_compra',sql.VarChar, data.orden_compra)
        .input('correo',sql.VarChar, data.correo)
        .query("update Venta set total_venta = @total_venta, correo = @correo, orden_compra = @orden_compra where id_venta = @id_venta");
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.json("venta actualizado");
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

const deleteVenta = async(req,res) => {
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_venta',sql.Int, id) 
        .query('delete from Venta where id_venta = @id_venta');
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.send("Usuario eliminado")
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
    view: getventa,
    viewById: getventaById,
    create: createVenta,
    update: updateVenta,
    delete: deleteVenta
}
