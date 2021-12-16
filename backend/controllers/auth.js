const User = require('../models/usuarios_modelo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require("../config/keys");
const { createJWT } = require("../utils/auth");

const mailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res, next) => {
    let { nombre, apellidos, mail, password, password_confirmation } = req.body;
    let errors = [];
    if (!nombre) {
        errors.push({ nombre: "required" });
    }
    if (!apellidos) {
        errors.push({ apellidos: "required" });
    }
    if (!mail) {
        errors.push({ mail: "required" });
    }
    if (!mailRegexp.test(mail)) {
        errors.push({ mail: "invalid" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (!password_confirmation) {
        errors.push({
            password_confirmation: "required",
        });
    }
    if (password != password_confirmation) {
        errors.push({ password: "mismatch" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    User.findOne({ mail: mail })
        .then(user => {
            if (user) {
                return res.status(422).json({ errors: [{ user: "Mail already exists" }] });
            } else {
                const user = new User({
                    nombre: nombre,
                    apellidos: apellidos,
                    mail: mail,
                    password: password,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(response => {
                                res.status(200).json({
                                    success: true,
                                    msg: "El usuario ha sido registrado"
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{ error: err }]
                                });
                            });
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}
exports.signin = (req, res) => {
    // Form validation
    let { mail, password } = req.body;
    let errors = [];

    if (!mail) {
        errors.push({ mail: "required" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    // Find user by email
    User.findOne({ mail }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
}

exports.logout = (req, res) => {}