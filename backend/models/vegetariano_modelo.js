const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vegetarianoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    tiempo_estimado: {
        type: Number
    },
    fecha_publicacion: {
        type: Date,
        default: Date.now
    },
    numero_comensales: Number,
    ingredientes: [{
        nombre: String,
        cantidad: {
            type: Number,
            required: true,
            default: 1
        },
        unidad: {
            type: String
        }
    }],
    pasos: [{
        descripcion: {
            type: String,
            required: true
        },
        imagen: String
    }]
});

const VegetarianoModelo = mongoose.model('vegetariano', vegetarianoSchema);

module.exports = VegetarianoModelo;
