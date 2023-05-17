//Import 
const sql  = require('mssql');


const dbSettings = {
    user:'sa',
    password: 'P@ssw0rd',
    server: 'localhost',
    database: 'MusicPro',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection: getConnection,
    sql: sql
}
