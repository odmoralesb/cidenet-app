const { Schema, model } = require('mongoose');

const empleadoSchema = Schema({
    primer_apellido: {
        type: String,
        required: [true, 'El primer apellido es obligatorio']
    },
    segundo_apellido: {
        type: String,
        required: [true, 'El segundo apellido es obligatorio']
    },
    primer_nombre: {
        type: String,
        required: [true, 'El primer nombre es obligatorio']
    },
    otros_nombres: {
        type: String
    },
    pais: {
        type: String,
        required: [true, 'El pais es obligatorio']
    },
    tipo_identificacion: {
        type: String,
        required: [true, 'El tipo de identificacion es obligatorio']
    },
    identificacion: {
        type: String,
        required: [true, 'La identificacion es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    fechaIngreso: { type: Date },
    fechaRegistro: { type: Date, default: Date.now }
});

empleadoSchema.methods.toJSON = function () {
    const { __v, _id, ...empleado } = this.toObject();
    empleado.uid = _id;
    return empleado;
};

module.exports = model('Empleado', empleadoSchema);
