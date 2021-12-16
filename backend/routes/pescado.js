const router = require('express').Router();
const Pescado = require('../models/pescado_modelo');

//get pescado
router.route('/get/').get((req, res) => {
    Pescado.find().sort({fecha_publicacion: -1})
        .then(pescado => res.json(pescado))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get pescado by id
router.get('/get/:id', (req, res) => {
    Pescado.findById(req.params.id)
        .then(pescado => res.json(pescado))
        .catch(err => res.status(404).json({ nopescadofound: 'No se encontró la sopa' }));
});

//add pescado
router.post('/add/', (req, res) => {
    Pescado.create(req.body)
        .then(pescado => res.json({ msg: 'Añadido correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir' }));
});

//update pescado
router.put('/update/:id', (req, res) => {
    Pescado.findByIdAndUpdate(req.params.id, req.body)
        .then(pescado => res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete pescado
router.delete('/delete/:id', (req, res) => {
    Pescado.findByIdAndRemove(req.params.id, req.body)
        .then(pescado => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;