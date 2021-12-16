const router = require('express').Router();
const Postres = require('../models/postresydulces_modelo');

//get postre
router.route('/get/').get((req, res) => {
    Postres.find().sort({fecha_publicacion: -1})
        .then(postre => res.json(postre))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get postre by id
router.get('/get/:id', (req, res) => {
    Postres.findById(req.params.id)
        .then(postre => res.json(postre))
        .catch(err => res.status(404).json({ nopostrefound: 'No se encontró' }));
});

//add postre
router.post('/add/', (req, res) => {
    Postres.create(req.body)
        .then(postre => res.json({ msg: 'añadida correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir la sopa' }));
});

//update postre
router.put('/update/:id', (req, res) => {
    Postres.findByIdAndUpdate(req.params.id, req.body)
        .then(postre => res.json({ msg: 'Actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete postre
router.delete('/delete/:id', (req, res) => {
    Postres.findByIdAndRemove(req.params.id, req.body)
        .then(postre => res.json({ mgs: 'Borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;