const { Schema, model } = require('mongoose');

const PaiseSchema = Schema({
    id: {
        type: Number,
        required: [true, 'El id es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
});

PaiseSchema.methods.toJSON = function () {
    const { __v, _id, ...paise } = this.toObject();
    paise.uid = _id;
    return paise;
};

module.exports = model('Paise', PaiseSchema);
