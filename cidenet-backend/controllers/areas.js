const { response } = require('express');
const Area = require('../models/area');

const areasGet = async (req, res = response) => {
    //
    const areas = await Area.find();
    res.json({
        areas
    });
    //
};

module.exports = {
    areasGet
};
