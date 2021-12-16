const router = require('express').Router();
const Sopas = require('../models/sopas_modelo');

//get sopas
router.route('/get/').get((req, res) => {
    Sopas.find().sort({fecha_publicacion: -1})
        .then(sopa => res.json(sopa))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get sopa by id
router.get('/get/:id', (req, res) => {
    Sopas.findById(req.params.id)
        .then(sopa => res.json(sopa))
        .catch(err => res.status(404).json({ nosopafound: 'No se encontró la sopa' }));
});

//add sopa
router.post('/add/', (req, res) => {
    Sopas.create(req.body)
        .then(sopa => res.json({ msg: 'Sopa añadida correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir la sopa' }));
});

//update sopa
router.put('/update/:id', (req, res) => {
    Sopas.findByIdAndUpdate(req.params.id, req.body)
        .then(sopa => res.json({ msg: 'Sopa actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete sopa
router.delete('/delete/:id', (req, res) => {
    Sopas.findByIdAndRemove(req.params.id, req.body)
        .then(sopa => res.json({ mgs: 'Sopa borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;