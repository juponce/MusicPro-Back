const {getConnection,sql} = require('../database/connection');

const getBodega = async (req,res) => {
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request().query('select * from Bodega');
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

const getBodegaById = async (req,res) => {
    const {id} = req.params;
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_bodega',sql.Int, id) 
        .query('select * from Bodega where id_bodega =  @id_bodega');
        console.log(respuesta.recordset);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json(respuesta.recordset);
        }else{
            res.status(500);
            res.send('Error Bodega no disponible')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }V}

const createBodega = async (req,res) => {

    console.log(req.body);        

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('nombre',sql.VarChar, data.nombre)
        .input('direccion',sql.VarChar, data.direccion)
        .query('Insert into Bodega (nombre, direccion) VALUES (@nombre, @direccion)');
        console.log(respuesta);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json("Bodega Creada");
        }else{
            res.status(500);
            res.send('Error al crear la Bodega')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const updateBodega = async (req,res) => {
    console.log(req.body);
    const {id} = req.params;

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('id_bodega',sql.Int, id)
        .input('nombre',sql.VarChar, data.nombre)
        .input('direccion',sql.VarChar, data.direccion)
        .query("update Bodega set nombre = @nombre, direccion = @direccion where id_bodega = @id_bodega");
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.json(`Bodega con el id ${id} actualizada`);
        }else{
            res.status(500);
            res.send(`Error al actualizar no se encuentra bodega con el id ${id}`);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const deleteBodega = async(req,res) => {
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_bodega',sql.Int, id) 
        .query('delete from Bodega where id_bodega = @id_bodega');
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.send(`Bodega con el id ${id} eliminada`)
        }else {
            res.status(500);
            res.send(`Error al eliminar no se encuentra bodega con el id ${id}`)

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
    view: getBodega,
    viewById: getBodegaById,
    create: createBodega,
    update: updateBodega,
    delete: deleteBodega
}
