const router = require('express').Router();
let Usuario = require('../models/usuarios_modelo');

//get usuarios
router.route('/get/').get((req, res) => {
    Usuario.find()
        .then(usuario => res.json(usuario))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get usuario by id
router.get('/get/:id', (req, res) => {
    Usuario.findById(req.params.id)
        .then(usuario => res.json(usuario))
        .catch(err => res.status(404).json({ nobookfound: 'No se encontró el usuario' }));
});

//add usuario
router.post('/add/', (req, res) => {
    Usuario.create(req.body)
        .then(usuario => res.json({ mensaje: 'Usuario añadido correctamente' }))
        .catch(err => res.status(400).json({ error: 'No se pudo añadir el usuario' }));
});

//update usuario
router.put('/update/:id', (req, res) => {
    Usuario.findByIdAndUpdate(req.params.id, req.body)
        .then(usuario => res.json({ mensaje: 'Usuario actualizado correctamente' }))
        .catch(err =>
            res.status(400).json({ error: 'No se pudo actualizar' })
        );
});

//delete usuario
router.delete('/delete/:id', (req, res) => {
    Usuario.findByIdAndRemove(req.params.id, req.body)
        .then(usuario => res.json({ mensaje: 'Usuario borrado correctamente' }))
        .catch(err => res.status(404).json({ error: 'No se puedo borrar' }));
});

module.exports = router;