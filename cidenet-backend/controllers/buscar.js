const { response } = require('express');

const { Empleado } = require('../models');

const buscarCorreoGet = async (req, res = response) => {
    const { termino } = req.params;
    var regex = new RegExp('^' + termino);
    const empleados = await Empleado.find({ correo: regex });
    return res.json({ empleados });
};

const buscarUsuariosPost = async (req, res = response) => {
    const { limite = 10, desde = 0 } = req.query;
    const {
        termino,
        identificacion,
        tipo_identificacion,
        pais,
        estado
    } = req.body;

    const andext = [];

    if (tipo_identificacion !== '') andext.push({ tipo_identificacion });
    if (pais !== '') andext.push({ pais });

    const regex = new RegExp(termino, 'i');
    const regexidn = new RegExp(identificacion, 'i');

    const [total, empleados] = await Promise.all([
        Empleado.countDocuments({
            $or: [
                { primer_nombre: regex },
                { otros_nombres: regex },
                { primer_apellido: regex },
                { segundo_apellido: regex },
                { correo: regex }
            ],
            $and: [{ estado }, { identificacion: regexidn }, ...andext]
        }),
        Empleado.find({
            $or: [
                { primer_nombre: regex },
                { otros_nombres: regex },
                { primer_apellido: regex },
                { segundo_apellido: regex },
                { correo: regex }
            ],
            $and: [{ estado }, { identificacion: regexidn }, ...andext]
        })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    return res.json({
        total,
        empleados
    });
};

module.exports = {
    buscarCorreoGet,
    buscarUsuariosPost
};
