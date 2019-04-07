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
    edit: function (req, res, next) {

    },
    update: function (req, res, next) {

    },
    delete: function (req, res, next) {

    }
}