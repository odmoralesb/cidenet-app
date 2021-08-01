const { Schema, model } = require('mongoose');

const TipoIdentificacion = Schema(
    {
        id: {
            type: Number,
            required: [true, 'El id es obligatorio']
        },
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        }
    },
    { collection: 'tipo_identificaciones' }
);

TipoIdentificacion.methods.toJSON = function () {
    const { __v, _id, ...tipo_identificacion } = this.toObject();
    tipo_identificacion.uid = _id;
    return tipo_identificacion;
};

module.exports = model('TipoIdentificacione', TipoIdentificacion);
