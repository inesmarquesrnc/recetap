const router = require('express').Router();
const Acompaniamientos = require('../models/acompaniamiento_modelo');

//get acompaniamientos
router.route('/get/').get((req, res) => {
    Acompaniamientos.find().sort({fecha_publicacion: -1})
        .then(acompaniamiento => res.json(acompaniamiento))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get acompaniamiento by id
router.get('/get/:id', (req, res) => {
    Acompaniamientos.findById(req.params.id)
        .then(acompaniamiento => res.json(acompaniamiento))
        .catch(err => res.status(404).json({ noacompaniamientofound: 'No se encontró la sopa' }));
});

//add acompaniamiento
router.post('/add/', (req, res) => {
    Acompaniamientos.create(req.body)
        .then(acompaniamiento => res.json({ msg: 'Añadido correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir' }));
});

//update acompaniamiento
router.put('/update/:id', (req, res) => {
    Acompaniamientos.findByIdAndUpdate(req.params.id, req.body)
        .then(acompaniamiento => res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete acompaniamiento
router.delete('/delete/:id', (req, res) => {
    Acompaniamientos.findByIdAndRemove(req.params.id, req.body)
        .then(acompaniamiento => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;