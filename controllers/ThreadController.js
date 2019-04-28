const Thread = require('../models/Thread');
const Forum = require('../models/Forum');
const Member = require('../models/Member');

module.exports = {
    index: function (req, res, next) {
        //return res.status(200).json(req.params.id)
        Thread.findAll({
            where: {
                forum_id: req.params.id
            },
            include: [{
                model:Forum,
                as: 'forum'
            },
            {
                model:Member,
                as: 'member'
            }],
        })
         .then(threads => {
                // console.log(threads);
                res.status(200).json(threads);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    store: function (req, res, next) {
        let thread = new Thread();
        thread.title = req.body.title;
        thread.body = req.body.body;
        thread.forum_id = req.body.forum_id;
        thread.member_id = req.body.userId;
        return thread.save()
            .then(threads => {
                // console.log(threads);
                res.status(200).json(threads);
            })
            .catch(err => {
                res.status(500).json(err)
            });
    },
    getThreadById: function (req, res, next) {
        Thread.findAll({
            where: {
                thread_id: req.params.id
            },
            include: [{
                model:Forum,
                as: 'forum'
            },
            {
                model:Member,
                as: 'member'
            }],
            limit: 2,
            offest:req.params.offest
        })
         .then(threads => {
                // console.log(threads);
                res.status(200).json(threads);
            })
            .catch(err => {
                console.log(err)
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