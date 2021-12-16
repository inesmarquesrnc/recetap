const router = require('express').Router();
const Bebidas = require('../models/bebida_modelo');

//get bebida
router.route('/get/').get((req, res) => {
    Bebidas.find().sort({fecha_publicacion: -1})
        .then(bebida => res.json(bebida))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get bebida by id
router.get('/get/:id', (req, res) => {
    Bebidas.findById(req.params.id)
        .then(bebida => res.json(bebida))
        .catch(err => res.status(404).json({ nobebidafound: 'No se encontró la sopa' }));
});

//add bebida
router.post('/add/', (req, res) => {
    Bebidas.create(req.body)
        .then(bebida => res.json({ msg: 'Añadido correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir' }));
});

//update bebida
router.put('/update/:id', (req, res) => {
    Bebidas.findByIdAndUpdate(req.params.id, req.body)
        .then(bebida => res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete bebida
router.delete('/delete/:id', (req, res) => {
    Bebidas.findByIdAndRemove(req.params.id, req.body)
        .then(bebida => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;