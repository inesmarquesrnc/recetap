const router = require('express').Router();
const Otros = require('../models/otros_modelo');

//get otro
router.route('/get/').get((req, res) => {
    Otros.find().sort({fecha_publicacion: -1})
        .then(otro => res.json(otro))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get otro by id
router.get('/get/:id', (req, res) => {
    Otros.findById(req.params.id)
        .then(otro => res.json(otro))
        .catch(err => res.status(404).json({ nootrofound: 'No se encontró la sopa' }));
});

//add otro
router.post('/add/', (req, res) => {
    Otros.create(req.body)
        .then(otro => res.json({ msg: 'Añadido correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir' }));
});

//update otro
router.put('update/:id', (req, res) => {
    Otros.findByIdAndUpdate(req.params.id, req.body)
        .then(otro=> res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete otro
router.delete('/delete/:id', (req, res) => {
    Otros.findByIdAndRemove(req.params.id, req.body)
        .then(otro => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;