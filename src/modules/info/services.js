const debug = require('debug')('app:module-database');
const { Database } = require('../../database/index');


const getAllDepartments = async () => {
    try {
        const query = `SELECT * FROM TBL_DEPARTAMENTOS`;
        const departamentos = await Database(query);
        return departamentos;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const getDepartmentByID = async (id) => {
    const query = 'SELECT * FROM TBL_DEPARTAMENTOS WHERE ID = ?';
    const params = [id];
    try {
        const rows = await Database(query, params);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener departamento por ID:', error);
        throw error;
    }
};

module.exports.geografiaService = {
    getAllDepartments,
    getDepartmentByID
}