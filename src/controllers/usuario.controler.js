const {getConnection,sql} = require('../database/connection');

const getUser = async (req,res) => {
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request().query('Select * from Usuario');
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

const getUserById = async (req,res) => {
    const {id} = req.params;
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('correo',sql.VarChar, id) 
        .query('Select * from Usuario where correo = @correo');
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
    }
}

const createUser = async (req,res) => {
    console.log(req.body);        

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('correo',sql.VarChar, data.correo)
        .input('nombre',sql.VarChar, data.nombre)
        .input('apellido',sql.VarChar, data.apellido)
        .input('contrasena',sql.VarChar, data.contrasena)
        .input('tipo_cuenta',sql.Int, data.tipo_cuenta)
        .query('Insert into Usuario (correo, nombre, apellido,contrasena ,tipo_cuenta) VALUES (@correo,@nombre, @apellido,@contrasena ,@tipo_cuenta)');
        console.log(respuesta);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json("Usuario creado");
        }else{
            res.status(500);
            res.send('Error al crear el usuario')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const updateUser = async (req,res) => {
    console.log(req.body);
    const {id} = req.params;

    try {
        const pool = await getConnection();
        const data = req.body;

        const request = await pool.request();
        
        const respuesta = await request
        .input('id_correo',sql.VarChar, id)
        .input('correo',sql.VarChar, data.correo)
        .input('nombre',sql.VarChar, data.nombre)
        .input('apellido',sql.VarChar, data.apellido)
        .input('contrasena',sql.VarChar, data.contrasena)
        .input('tipo_cuenta',sql.Int, data.tipo_cuenta)
        .query("update Usuario set correo = @correo, nombre = @nombre, apellido = @apellido, contrasena = @contrasena, tipo_cuenta = @tipo_cuenta where correo = @id_correo");
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

const deleteUser = async(req,res) => {
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_usuario',sql.VarChar, id) 
        .query('delete from Usuario where correo = @id_usuario');
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
    view: getUser,
    viewById: getUserById,
    create: createUser,
    update: updateUser,
    delete: deleteUser
}
