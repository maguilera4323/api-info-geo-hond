const express = require('express');
const { geografiaController } = require('./controller');
const cors = require('cors');
const router = express.Router();

router.use(cors({
    origin: '*', // Especifica el origen permitido
    methods: ['GET'], // Especifica los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Especifica los encabezados permitidos
}));

router
    .get('/departamentos/', geografiaController.getDepartamentos)
    .get('/departamentos/:id', geografiaController.getDepartamento)

module.exports.geografiaAPI = (app) => {
    app.use('/api/info', router);
};