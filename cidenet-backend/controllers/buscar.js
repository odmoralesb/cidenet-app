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
    const { termino, identificacion } = req.body;
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
            $and: [{ identificacion: regexidn }]
        }),
        Empleado.find({
            $or: [
                { primer_nombre: regex },
                { otros_nombres: regex },
                { primer_apellido: regex },
                { segundo_apellido: regex },
                { correo: regex }
            ],
            $and: [{ identificacion: regexidn }]
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
