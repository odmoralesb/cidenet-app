const { Usuario } = require('../models');

const emailExiste = async (correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} está registrado en la BD`);
    }
};

const existeUsuarioPorID = async (id) => {
    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
};

module.exports = {
    emailExiste,
    existeUsuarioPorID
};
