const express = require('express');
const { geografiaController } = require('./controller');
const cors = require('cors');
const router = express.Router();

router.use(cors({
    origin: '*', 
    methods: ['GET'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

router
    .get('/departamentos/', geografiaController.getDepartamentos)
    .get('/departamentos/:id', geografiaController.getDepartamento)

    .get('/municipios', geografiaController.getMunicipiosByDepartamento)
    .get('/municipios/:id', geografiaController.getMunicipio)
    //.get('/municipios/', geografiaController.getMunicipios)  

    .get('/aldeas', geografiaController.getAldeasByMunicipio)
    .get('/aldeas/:id', geografiaController.getAldea)

module.exports.geografiaAPI = (app) => {
    app.use('/api/info', router);
};