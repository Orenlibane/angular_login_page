const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bycrypt = require("bcryptjs");


// Login page

router.get('/login', (req, res) => res.send('Login'))

// Register page

router.post('/signup', (req,res) => {
    debugger
    const { name, password, password2, email} = req.body;
    const user = {name: req.body.name, password: req.body.password, password2: req.body.password2, email: req.body.email}
    let errors = [];

    if (!name || !password) {
        errors.push({ msg: 'Please Fill in all fields'})
    } if (password.length <5) {
        errors.push({ msg: 'password is too short'})
    } if (password !== password2) {
        errors.push({ msg: 'passwords dosent match'})
    }
    if (errors.length) {
        res.status(400).send({msgs: errors})
    }
    else {
     // DB query
     User.findOne({name})
         .then(user => {
             if(user){
                 errors.push({ msg: 'user already signed'})
             } else {
                 const newUser = new User({name, password, email});
                 console.log('new User', newUser)

                 //Hash password
                 bycrypt.genSalt(10, (err, salt) =>
                     bycrypt.hash(newUser.password, salt, (err, hash) => {
                         if (err) {
                             throw err;
                         } else {
                             console.log('user before', newUser)
                             newUser.password = hash;
                             console.log('user after', newUser)
                             newUser.save()
                                 .then(user => {res.status(200).send({msg: 'user Created'})})
                                 .catch(err => {res.status(400).send({msgs: 'error'})});
                         }

                 }))
             }
         })
    }


    // check if user in db

    // if user not in db - add it

})

router.get('/register', (req, res) => res.send('register'))


module.exports = router;
