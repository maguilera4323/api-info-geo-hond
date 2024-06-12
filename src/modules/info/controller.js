const debug = require('debug')('app:categoria-insumo-module-controller');
const { geografiaService } = require('./services');
const { Response } = require('../../common/response');
const createError = require('http-errors');

module.exports.geografiaController = {

    getDepartamentos: async (req, res) => {
        try {
            let departments = await geografiaService.getAllDepartments();
            Response.success(res, 200, 'Lista de departamentos', departments);
            debug('Fetched departments:', departments);
        } catch (error) {
            console.log('Error fetching departments:', error);
            Response.error(res);
        }
    },

    getDepartamento: async (req, res) => {
        try {
            const { params: { id } } = req;
            let departamento = await geografiaService.getDepartmentByID(id);
            if (!departamento) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Departamento ${id}`, departamento);
            }
        } catch (error) {
            debug('Error fetching department by ID:', error);
            Response.error(res);
        }
    },

    getMunicipios: async (req, res) => {
        try {
            let municipios = await geografiaService.getAllMunicipios();
            Response.success(res, 200, 'Lista de municipios', municipios);
            debug('Fetched municipios:', municipios);
        } catch (error) {
            console.log('Error fetching municipios:', error);
            Response.error(res);
        }
    },

    getMunicipio: async (req, res) => {
        try {
            const { params: { id } } = req;
            let municipio = await geografiaService.getMunicipioByID(id);
            if (!municipio) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Municipio ${id}`, municipio);
            }
        } catch (error) {
            console.log('Error fetching municipio by ID:', error);
            Response.error(res);
        }
    },

    getMunicipiosByDepartamento: async (req, res) => {
        try {
            const departamentoId = req.query.departamentoId;
            if (!departamentoId) {
                Response.error(res, new createError.BadRequest('El parámetro departamentoId es requerido.'));
                return;
            }

            let municipios = await geografiaService.getMunicipiosByDepartamento(departamentoId);
            if (!municipios || municipios.length === 0) {
                Response.error(res, new createError.NotFound('No se encontraron municipios para el departamento especificado.'));
            } else {
                Response.success(res, 200, `Municipios del departamento ${departamentoId}`, municipios);
            }
        } catch (error) {
            console.log('Error fetching municipios by departamentoId:', error);
            Response.error(res);
        }
    },

    getAldeasByMunicipio: async (req, res) => {
        try {
            const municipioId = req.query.municipio;
            if (!municipioId) {
                Response.error(res, new createError.BadRequest('El parámetro municipio es requerido.'));
                return;
            }

            let aldeas = await geografiaService.getAldeasByMunicipio(municipioId);
            if (!aldeas || aldeas.length === 0) {
                Response.error(res, new createError.NotFound('No se encontraron aldeas para el municipio especificado.'));
            } else {
                Response.success(res, 200, `Aldeas del municipio ${municipioId}`, aldeas);
            }
        } catch (error) {
            console.log('Error fetching municipios by departamentoId:', error);
            Response.error(res);
        }
    },

    getAldea: async (req, res) => {
        try {
            const { params: { id } } = req;
            let aldea = await geografiaService.getAldeaByID(id);
            if (!aldea) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Aldea ${id}`, aldea);
            }
        } catch (error) {
            console.log('Error fetching aldea by ID:', error);
            Response.error(res);
        }
    },


}