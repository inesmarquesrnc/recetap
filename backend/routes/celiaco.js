const router = require('express').Router();
const Celiacos = require('../models/celiaco_modelo');

//get celiaco
router.route('/get/').get((req, res) => {
    Celiacos.find().sort({fecha_publicacion: -1})
        .then(celiaco => res.json(carne))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get celiaco by id
router.get('/get/:id', (req, res) => {
    Celiacos.findById(req.params.id)
        .then(celiaco => res.json(celiaco))
        .catch(err => res.status(404).json({ noceliacofound: 'No se encontró la sopa' }));
});

//add celiaco
router.post('/add/', (req, res) => {
    Celiacos.create(req.body)
        .then(celiaco => res.json({ msg: 'Añadido correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir' }));
});

//update celiaco
router.put('update/:id', (req, res) => {
    Celiacos.findByIdAndUpdate(req.params.id, req.body)
        .then(celiaco => res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete celiaco
router.delete('delete/:id', (req, res) => {
    Celiacos.findByIdAndRemove(req.params.id, req.body)
        .then(celiaco => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;