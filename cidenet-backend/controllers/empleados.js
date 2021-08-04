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
        correo,
        fechaIngreso
    } = req.body;

    const empleado = new Empleado({
        primer_apellido,
        segundo_apellido,
        primer_nombre,
        otros_nombres,
        pais,
        tipo_identificacion,
        identificacion,
        correo,
        fechaIngreso
    });

    // Guardar en BD
    await empleado.save();

    res.status(201).json({
        empleado
    });
};

const empleadosGet = async (req = request, res = response) => {
    //

    const { limite = 10, desde = 0 } = req.query;

    const [total, empleados] = await Promise.all([
        Empleado.countDocuments(),
        Empleado.find().skip(Number(desde)).limit(Number(limite))
    ]);

    const params = req.res.json({
        total,
        empleados
    });
};

const empleadoGet = async (req = request, res = response) => {
    //
    const { id } = req.params;
    const empleado = await Empleado.findById(id);
    res.status(200).json(empleado);
    //
};

const empleadoPut = async (req, res = response) => {
    const { id } = req.params;
    const { ...resto } = req.body;
    const empleado = await Empleado.findByIdAndUpdate(id, resto, { new: true });
    res.status(200).json(empleado);
};

const empleadosDelete = async (req, res = response) => {
    //
    const { id } = req.params;
    const empleado = await Empleado.findByIdAndDelete(id);
    res.json(empleado);
};

module.exports = {
    empleadosPost,
    empleadosGet,
    empleadoGet,
    empleadoPut,
    empleadosDelete
};
