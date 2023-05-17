const {getConnection,sql} = require('../database/connection');

const getCarrito = async (req,res) => {
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request().query('select * from Carrito');
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

const getCarritoById = async (req,res) => {
    const {id} = req.params;
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_carrito',sql.Int, id) 
        .query('select * from Carrito where id_carrito =  @id_carrito');
        console.log(respuesta.recordset);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json(respuesta.recordset);
        }else{
            res.status(500);
            res.send('Error carrito no disponible')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }}

const createCarrito = async (req,res) => {

    console.log(req.body);        

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('fecha_creacion',sql.SmallDateTime, fechaActual())
        .input('correo',sql.VarChar, data.correo)
        .query('insert into Carrito (fecha_venta,correo)OUTPUT inserted.id_carrito values (@fecha_creacion, @correo)');
        console.log(respuesta);
        await pool.close(); // Cerrar la conexión a la base de datos
        const id_carrito = respuesta.recordset[0].id_carrito;

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json(id_carrito);
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

const updateCarrito = async (req,res) => {
    console.log(req.body);
    const {id} = req.params;

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('id_carrito',sql.Int, id)
        .input('total_venta',sql.Int, data.total_venta)
        .input('correo',sql.VarChar, data.correo)
        .query("update Carrito set total_venta = @total_venta, correo = @correo where id_carrito = @id_carrito");
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

const deleteCarrito = async(req,res) => {
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_carrito',sql.Int, id) 
        .query('delete from Carrito where id_carrito = @id_carrito');
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.send("Carrito eliminado")
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
    view: getCarrito,
    viewById: getCarritoById,
    create: createCarrito,
    update: updateCarrito,
    delete: deleteCarrito
}
