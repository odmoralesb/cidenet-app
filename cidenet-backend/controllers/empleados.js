const { response } = require('express');
const Empleado = require('../models/empleado');
const bcryptjs = require('bcryptjs');

const empleadosPost = async (req, res = response) => {
    //
    const {
        primer_apellido,
        segundo_apellido,
        primer_nombre,
        otros_nombres
    } = req.body;

    const empleado = new Empleado({
        primer_apellido,
        segundo_apellido,
        primer_nombre,
        otros_nombres
    });

    // Guardar en BD
    await empleado.save();

    res.json({
        empleado
    });
};

module.exports = {
    empleadosPost
};
