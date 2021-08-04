const { Pais, TipoIdentificacion, Empleado } = require('../models');

const esPaisValido = async (nombre = '') => {
    const existePais = await Pais.findOne({ nombre });
    if (!existePais) {
        throw new Error(`El pais ${nombre} no está registrado en la BD`);
    }
};

const esTipoIdentificacionValido = async (nombre = '') => {
    const existeTipo = await TipoIdentificacion.findOne({ nombre });
    if (!existeTipo) {
        throw new Error(
            `El tipo de identificacion ${nombre} no está registrado en la BD`
        );
    }
};

const existeCorreo = async (correo = '') => {
    const existe = await Empleado.findOne({ correo });
    if (existe) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`);
    }
};

const existeIdentificacion = async (identificacion = '') => {
    const existe = await Empleado.findOne({ identificacion });
    if (existe) {
        throw new Error(
            `Esta identificacion ${identificacion} ya está registrado en la BD`
        );
    }
};

const existeEmpleadoPorID = async (id) => {
    const existeEmpleado = await Empleado.findById(id);
    if (!existeEmpleado) {
        throw new Error(`El id de este empleado ${id} no existe`);
    }
};

module.exports = {
    esPaisValido,
    esTipoIdentificacionValido,
    existeCorreo,
    existeIdentificacion,
    existeEmpleadoPorID
};
