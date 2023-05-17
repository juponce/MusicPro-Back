const {getConnection,sql} = require('../database/connection');

const getstock = async (req,res) => {
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request().query('Select S.id_stock,S.cantidad,P.id_producto ,P.nombre,B.id_bodega,B.nombre From Stock S join Producto P on S.id_producto = P.id_producto join Bodega B on B.id_bodega = S.id_bodega');
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

const getstockById = async (req,res) => {
    const {id} = req.params;
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_stock',sql.Int, id) 
        .query('Select S.id_stock,S.cantidad,P.id_producto ,P.nombre,B.id_bodega,B.nombre From Stock S join Producto P on S.id_producto = P.id_producto join Bodega B on B.id_bodega = S.id_bodega where id_stock = @id_stock');
        console.log(respuesta.recordset);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json(respuesta.recordset);
        }else{
            res.status(500);
            res.send('Error Stock no disponible')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }}

const createStock = async (req,res) => {

    console.log(req.body);        

    try {
        const pool = await getConnection();
        const data = req.body;
        const request = await pool.request();
        
        const respuesta = await request
        .input('cantidad',sql.Int, data.cantidad)
        .input('id_producto',sql.Int, data.id_producto)
        .input('id_bodega',sql.Int, data.id_bodega)
        .query('Insert into Stock (cantidad, id_producto, id_bodega) VALUES (@cantidad,@id_producto, @id_bodega)');
        console.log(respuesta);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.send('Stock Creado')
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

const updateStock = async (req,res) => {
    console.log(req.body);
    const {id} = req.params;

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('id_stock',sql.Int, id)
        .input('cantidad',sql.Int, data.cantidad)
        .input('id_producto',sql.Int, data.id_producto)
        .input('id_bodega',sql.Int, data.id_bodega)
        .query("update Stock set cantidad = @cantidad, id_producto = @id_producto, id_bodega = @id_bodega where id_stock = @id_stock");
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.json("Stock actualizado");
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

const deleteStock = async(req,res) => {
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_stock',sql.Int, id) 
        .query('delete from Stock where id_stock = @id_stock');
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.send('Stock eliminado')
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
    view: getstock,
    viewById: getstockById,
    create: createStock,
    update: updateStock,
    delete: deleteStock
}
