const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let Member = require('../models/members');
var config = require('../config/config');

module.exports = {
    login: function (req, res, next) {
        Member.findOne({user_name: req.body.user_name }, function (err, user) {
            if (err) return res.status(500).send('Error on the server');
            if (!user) return res.status(404).send('No user found');
            let passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
            if (!passwordIsValid) return res.status(401).send({auth: false, token: user.password});
            let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
            res.status(200).send({ auth: true, token: token });
        })
    }
}