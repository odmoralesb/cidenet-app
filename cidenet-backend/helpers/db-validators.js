const { Pais, TipoIdentificacion } = require('../models');

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

module.exports = {
    esPaisValido,
    esTipoIdentificacionValido
};
