const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre: {
        type: String,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Usuario = mongoose.model('Usuario', usuariosSchema);

module.exports = Usuario;
