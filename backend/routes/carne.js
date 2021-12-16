const router = require('express').Router();
const Carnes = require('../models/carne_modelo');

//get carne
router.route('/get/').get((req, res) => {
    Carnes.find().sort({fecha_publicacion: -1})
        .then(carne => res.json(carne))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get carne by id
router.get('/get/:id', (req, res) => {
    Carnes.findById(req.params.id)
        .then(carne => res.json(carne))
        .catch(err => res.status(404).json({ nocarnefound: 'No se encontró la sopa' }));
});

//add carne
router.post('/add/', (req, res) => {
    Carnes.create(req.body)
        .then(carne => res.json({ msg: 'Añadido correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir' }));
});

//update carne
router.put('/update/:id', (req, res) => {
    Carnes.findByIdAndUpdate(req.params.id, req.body)
        .then(carne => res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete carne
router.delete('/delete/:id', (req, res) => {
    Carnes.findByIdAndRemove(req.params.id, req.body)
        .then(carne => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;