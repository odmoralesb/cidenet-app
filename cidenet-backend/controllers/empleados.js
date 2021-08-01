const { response } = require('express');
const Empleado = require('../models/empleado');
const bcryptjs = require('bcryptjs');

const empleadosPost = async (req, res = response) => {
    //
    const { primer_apellido, segundo_apellido } = req.body;
    const empleado = new Empleado({ primer_apellido, segundo_apellido });

    // Guardar en BD
    await empleado.save();

    res.json({
        empleado
    });
};

module.exports = {
    empleadosPost
};
