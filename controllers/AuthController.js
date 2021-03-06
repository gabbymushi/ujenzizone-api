const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let Member = require('../models/Member');
var config = require('../config/_config');

module.exports = {
    login: function (req, res, next) {
        Member.findOne({where:{email: req.body.email }}).then(function (user) {
            //return res.status(200).send(user.first_name);
           // if (err) return res.status(500).send('Error on the server');
            if (!user) return res.status(404).send('No user found');
            let passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
            if (!passwordIsValid) return res.status(401).send({auth: false, token: user.password});
            let token = jwt.sign({ id: user.member_id }, config.secret, { expiresIn: 86400});
            res.status(200).send({ auth: true, token: token,member:user });
        }).catch(err => {
            return res.status(500).send('Error on the server:'+err);
        });
    },
    create: function (req, res, next) {
        let password=bcrypt.hashSync(req.body.password,8)
        let member = new Member();
        member.first_name = req.body.first_name;
        member.last_name = req.body.last_name;
        member.email = req.body.email;
        member.gender = req.body.gender;
        member.password = password;
        member.save()
            //.exec()
            .then(members => {
                // console.log(members);
                res.status(200).json(members);
            })
            .catch(err => {
                res.status(500).json(err)
            });
        //res.send(req.body.first_name);
    },
    forgotPassword:function (req, res, next) {
        
    }
}