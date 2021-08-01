const { response } = require('express');

const { Empleado } = require('../models');

const buscarCorreoGet = async (req, res = response) => {
    const { termino } = req.params;
    var regex = new RegExp('^' + termino);
    const empleados = await Empleado.find({ correo: regex });
    return res.json({ empleados });
};

module.exports = {
    buscarCorreoGet
};
