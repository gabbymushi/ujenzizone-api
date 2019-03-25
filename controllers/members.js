const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let Member = require('../models/members');

module.exports = {
    index:function(req,res,next){
        Member.find({})
        .exec()
        .then(members => {
            console.log(members);
            res.status(200).json(members);
        })
        .catch(err => {
            res.status(500).json(err)
        });
    },
    create: function (req, res, next) {
        let password=bcrypt.hashSync(req.body.password,8)
        let member = new Member();
        member.first_name = req.body.first_name;
        member.last_name = req.body.last_name;
        member.user_name = req.body.user_name;
        member.gender = req.body.gender;
        member.password = password;
        member.save()
            //.exec()
            .then(members => {
                console.log(members);
                res.status(200).json(members);
            })
            .catch(err => {
                res.status(500).json(err)
            });
        //res.send(req.body.first_name);
    }
}