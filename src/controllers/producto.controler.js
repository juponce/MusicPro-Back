const {getConnection,sql} = require('../database/connection');

const getProductoStock = async (req,res) => {
    
    try {
        const pool = await getConnection();
        const resultado = await pool.request().query('Select P.id_producto,nombre,descripcion,precio,imagen,cantidad from Producto P join Stock S on S.id_producto = p.id_producto');
        console.log(resultado.recordset);

        if(resultado.rowsAffected[0] > 0){
            res.json(resultado.recordset);
        }else{
            res.status(500);
            res.json("Error de consulta");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const getProductos = async (req,res) => {
    
    try {
        const pool = await getConnection();
        const resultado = await pool.request()
        .query('Select P.id_producto,nombre,descripcion,precio,imagen,cantidad from Producto P left join Stock S on S.id_producto = p.id_producto');
        console.log(resultado.recordset);

        if(resultado.rowsAffected[0] > 0){
            res.json(resultado.recordset);
        }else{
            res.status(500);
            res.json("Error de consulta");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const getProductoById = async (req,res) => {

    const {id} = req.params;
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_producto',sql.Int, id) 
        .query('Select nombre,descripcion,precio,imagen,cantidad from Producto P left join Stock S on S.id_producto = p.id_producto where P.id_producto = @id_producto');
        console.log(respuesta.recordset);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json(respuesta.recordset);
        }else{
            res.status(500);
            res.json("Error de consulta");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const createProducto = async (req,res) => {

    console.log(req.body);        

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        console.log(data.nombre);
        console.log(data.descripcion);
        console.log(data.precio);
        console.log(data.imagen);
        
        const resultado = await request
        .input('nombre',sql.VarChar, data.nombre)
        .input('descripcion',sql.VarChar, data.descripcion)
        .input('precio',sql.Int, data.precio)
        .input('imagen',sql.VarChar, data.imagen)
        .input('fecha_creacion',sql.SmallDateTime,fechaActual())
        .query('Insert into Producto (nombre, descripcion, precio,imagen,fecha_creacion)OUTPUT inserted.id_producto VALUES (@nombre,@descripcion,@precio,@imagen,@fecha_creacion)');
        console.log(resultado);
        await pool.close(); // Cerrar la conexión a la base de datos
        const id_producto = resultado.recordset[0].id_producto;


        if(resultado.rowsAffected[0] > 0){
            res.json(id_producto);
        }else {
            res.status(500);
            res.json("Error al crear");
        }

    } catch (error) {
        console.log(error);
    } 
}


const updateProducto = async (req,res) => {
    const {id} = req.params;
    console.log(id);

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('id_producto',sql.Int, id)
        .input('nombre',sql.VarChar, data.nombre)
        .input('descripcion',sql.VarChar, data.descripcion)
        .input('precio',sql.Int, data.apellido)
        .input('imagen',sql.VarChar, data.imagen)   
        .query("Update Producto set nombre = @nombre, descripcion = @descripcion, precio = @precio, imagen = @imagen where id_producto = @id_producto");
        console.log(respuesta.rowsAffected[0]);

        await pool.close(); 
        console.log(respuesta);
        if(respuesta.rowsAffected[0] > 0 ){
            res.send("Producto actualizado");
        }else {
            res.status(500);
            res.send("Error al actualizar");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const deleteProducto = async (req,res) => {
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_producto',sql.Int, id) 
        .query('delete from Producto where id_producto = @id_producto');
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0 ){
            res.send("Producto eliminado");
        }else {
            res.status(500);
            res.send("Error al eliminar");
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
    viewStock: getProductoStock,
    view: getProductos,
    viewById: getProductoById,
    create: createProducto,
    update: updateProducto,
    delete: deleteProducto
}
