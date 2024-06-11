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

}