const router = require('express').Router();
const Desayunos = require('../models/desayuno_modelo');

//get desayuno
router.route('/get/').get((req, res) => {
    Desayunos.find().sort({fecha_publicacion: -1})
        .then(desayuno => res.json(desayuno))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get desayuno by id
router.get('/get/:id', (req, res) => {
    Desayunos.findById(req.params.id)
        .then(desayuno => res.json(desayuno))
        .catch(err => res.status(404).json({ nodesayunofound: 'No se encontró la sopa' }));
});

//add desayuno
router.post('/add/', (req, res) => {
    Desayunos.create(req.body)
        .then(desayuno => res.json({ msg: 'Añadido correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir' }));
});

//update desayuno
router.put('/update/:id', (req, res) => {
    Desayunos.findByIdAndUpdate(req.params.id, req.body)
        .then(desayuno => res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete desayuno
router.delete('/delete/:id', (req, res) => {
    Desayunos.findByIdAndRemove(req.params.id, req.body)
        .then(desayuno => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;