const { response } = require('express');
const TipoIdentificacion = require('../models/tipo_identificacion');

const tipoIdentificacionesGet = async (req, res = response) => {
    //
    const tipo_identificacones = await TipoIdentificacion.find();
    res.json({
        tipo_identificacones
    });
    //
};

module.exports = {
    tipoIdentificacionesGet
};
