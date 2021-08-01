const { response } = require('express');
const Empleado = require('../models/empleado');

const empleadosPost = async (req, res = response) => {
    //
    const {
        primer_apellido,
        segundo_apellido,
        primer_nombre,
        otros_nombres,
        pais,
        tipo_identificacion,
        identificacion,
        correo
    } = req.body;

    const empleado = new Empleado({
        primer_apellido,
        segundo_apellido,
        primer_nombre,
        otros_nombres,
        pais,
        tipo_identificacion,
        identificacion,
        correo
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
