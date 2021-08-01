const { response } = require('express');
const Pais = require('../models/pais');

const paisesGet = async (req, res = response) => {
    //
    const paises = await Pais.find();
    res.json({
        paises
    });
    //
};

module.exports = {
    paisesGet
};
