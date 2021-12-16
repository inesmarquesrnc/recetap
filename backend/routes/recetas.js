const router = require('express').Router();
const Receta = require('../models/recetas_modelo');


//get recetas
router.route('/get/').get((req, res) => {
    Receta.find().sort({fecha_publicacion: -1})
        .then(receta => res.json(receta))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get receta by id
router.get('/get/:id', (req, res) => {
    Receta.findById(req.params.id)
        .then(receta => res.json(receta))
        .catch(err => res.status(404).json({ norecetafound: 'No se encontró la receta' }));
});

//add receta
router.post('/add/', (req, res) => {
    Receta.create(req.body)
        .then(receta => res.json({ msg: 'Receta añadida correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir la receta' }));
});

//update receta
router.put('/update/:id', (req, res) => {
    Receta.findByIdAndUpdate(req.params.id, req.body)
        .then(receta => res.json({ msg: 'Receta actualizada correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete receta
router.delete('/delete/:id', (req, res) => {
    Receta.findByIdAndRemove(req.params.id, req.body)
        .then(receta => res.json({ mgs: 'Receta borrada correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;