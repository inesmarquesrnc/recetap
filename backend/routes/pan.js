const router = require('express').Router();
const Pan = require('../models/pan_modelo');

//get pan
router.route('/get/').get((req, res) => {
    Pan.find().sort({fecha_publicacion: -1})
        .then(pan => res.json(pan))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get pan by id
router.get('/get/:id', (req, res) => {
    Pan.findById(req.params.id)
        .then(pan => res.json(pan))
        .catch(err => res.status(404).json({ nopanfound: 'No se encontró la sopa' }));
});

//add pan
router.post('/add/', (req, res) => {
    Pan.create(req.body)
        .then(pan => res.json({ msg: 'Añadido correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir' }));
});

//update pan
router.put('update/:id', (req, res) => {
    Pan.findByIdAndUpdate(req.params.id, req.body)
        .then(pan=> res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete pan
router.delete('/delete/:id', (req, res) => {
    Pan.findByIdAndRemove(req.params.id, req.body)
        .then(pan => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;