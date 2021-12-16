const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recetasSchema = new Schema({
    nombre: {
        type: String,
        required: true},
    tiempo_estimado: {type: Number},
    fecha_publicacion: {
        type: Date,
        default: Date.now},
    numero_comensales: {type: Number},
    ingredientes: [{
        nombre: {
            type: String,
            required: true},
        cantidad: {
            type: Number,
            required: true,
            default: 1},
        unidad: {type: String}
    }],
    pasos: [{
        descripcion: {
            type: String,
            required: true},
        imagen: {type: String}
    }],
    imagen: {type: String}
});

const RecetaModelo = mongoose.model('receta', recetasSchema);

module.exports = RecetaModelo;
