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

const getAllMunicipios = async () => {
    try {
        const query = `SELECT * FROM TBL_MUNICIPIOS`;
        const municipios = await Database(query);
        return municipios;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const getMunicipioByID = async (id) => {
    const query = `SELECT M.NOMBRE, M.CODIGO, D.NOMBRE AS DEPARTAMENTO 
                    FROM TBL_MUNICIPIOS M
                    INNER JOIN TBL_DEPARTAMENTOS D ON M.ID_DEPARTAMENTO = D.ID
                    WHERE CODIGO = ?`;
    const params = [id];
    try {
        const rows = await Database(query, params);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener municipio por ID:', error);
        throw error;
    }
};

const getMunicipiosByDepartamento = async (id) => {
    try {
        const query = `SELECT ID, NOMBRE, CODIGO FROM TBL_MUNICIPIOS where ID_DEPARTAMENTO = ?`;
        const params = [id];
        const municipios = await Database(query, params);
        return municipios;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const getAldeaByID = async (id) => {
    const query = `SELECT 
                        A.NOMBRE, A.CODIGO, M.NOMBRE AS MUNICIPIO, 
                        D.NOMBRE AS DEPARTAMENTO 
                    FROM TBL_ALDEAS A 
                    INNER JOIN TBL_MUNICIPIOS M ON A.CODIGO_MUN = M.CODIGO 
                    INNER JOIN TBL_DEPARTAMENTOS D ON M.ID_DEPARTAMENTO = D.ID 
                    WHERE A.CODIGO = ?`;
    const params = [id];
    try {
        const rows = await Database(query, params);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener aldea por ID:', error);
        throw error;
    }
};

const getAldeasByMunicipio = async (id) => {
    try {
        const query = `SELECT ID, NOMBRE, CODIGO FROM TBL_ALDEAS where CODIGO_MUN = ?`;
        const params = [id];
        const aldeas = await Database(query, params);
        return aldeas;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


module.exports.geografiaService = {
    getAllDepartments,
    getDepartmentByID,
    getAllMunicipios,
    getMunicipioByID,
    getMunicipiosByDepartamento,
    getAldeasByMunicipio,
    getAldeaByID
}