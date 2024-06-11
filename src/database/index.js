const mysql = require('mysql2/promise');
const debug = require('debug')('app:module-database');
const { Config } = require('../config/index');

const pool = mysql.createPool({
    host: Config.mysql_host,
    user: Config.mysql_user,
    password: Config.mysql_password,
    database: Config.mysql_db,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

module.exports.Database = async (query, params) => {
    let connection;
    try {
        connection = await pool.getConnection();
        debug('Conexión obtenida del pool');

        const [results] = await connection.execute(query, params);
        return results;
    } catch (error) {
        debug('Error al ejecutar la consulta:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.release(); 
            debug('Conexión liberada al pool');
        }
    }
};