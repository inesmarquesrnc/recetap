const router = require('express').Router();
const Pastas = require('../models/pastayarroz_modelo');

//get arroz
router.route('/get/').get((req, res) => {
    Pastas.find().sort({fecha_publicacion: -1})
        .then(pasta => res.json(pasta))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get pasta by id
router.get('/get/:id', (req, res) => {
    Pastas.findById(req.params.id)
        .then(pasta => res.json(pasta))
        .catch(err => res.status(404).json({ nopastafound: 'No se encontró la pasta o arroz' }));
});

//add pasta
router.post('/add/', (req, res) => {
    Pastas.create(req.body)
        .then(pasta => res.json({ msg: 'Añadida correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir' }));
});

//update pasta
router.put('/update/:id', (req, res) => {
    Pastas.findByIdAndUpdate(req.params.id, req.body)
        .then(pasta => res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete pasta
router.delete('/delete/:id', (req, res) => {
    Pastas.findByIdAndRemove(req.params.id, req.body)
        .then(pasta => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se pudo borrar' }));
});

module.exports = router;