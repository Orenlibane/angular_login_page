const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bycrypt = require("bcryptjs");
const passport = require('passport');


// Login page

router.post('/login', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
        successRedirect: res.status(201).send(),
        failureRedirect: '/FAIL'
    })(req, res, next);
});


// Register page

router.post('/signup', (req, res) => {
    debugger
    const {name, password, password2, email} = req.body;
    const user = {
        name: req.body.name,
        password: req.body.password,
        password2: req.body.password2,
        email: req.body.email
    }
    let errors = [];

    if (!name || !password) {
        errors.push({msg: 'Please Fill in all fields'})
    }
    if (password.length < 5) {
        errors.push({msg: 'password is too short'})
    }
    if (password !== password2) {
        errors.push({msg: 'passwords dosent match'})
    }
    if (errors.length) {
        res.status(400).send({msgs: errors})
    } else {
        // DB query
        User.findOne({name})
            .then(user => {
                if (user) {
                    errors.push({msg: 'user already signed'})
                } else {
                    const newUser = new User({name, password, email});

                    //Hash password
                    bycrypt.genSalt(10, (err, salt) =>
                        bycrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                throw err;
                            } else {
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        res.status(200).send({msg: 'user Created'})
                                    })
                                    .catch(err => {
                                        res.status(400).send({msgs: 'error'})
                                    });
                            }

                        }))
                }
            })
    }
})

module.exports = router;
