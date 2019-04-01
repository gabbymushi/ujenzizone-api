const express = require('express');
const Thread = require('../models/threads');

module.exports = {
    index: function (req, res, next) {
        Thread.find({})
        .exec()
        .then(threads => {
            console.log(threads);
            res.status(200).json(threads);
        })
        .catch(err => {
            res.status(500).json(err)
        });
    },
    store: function (req, res, next) {
        let thread = new Thread();
        thread.title=req.body.title;
        thread.body=req.body.body;
        thread.forum_id=req.body.forum_id;
        return thread.save()
        .then(threads => {
            console.log(threads);
            res.status(200).json(threads);
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