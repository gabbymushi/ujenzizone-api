const Forum = require('../models/Forum');

module.exports = {
    index: function (req, res, next) {
        Forum.findAll({})
        .then(forums => {
            // console.log(forums);
            res.status(200).json(forums);
        })
        .catch(err => {
            res.status(500).json(err)
        });
    },
    store: function (req, res, next) {
        let forum = new Forum();
        forum.forum_name=req.body.forum_name;
        forum.description=req.body.description;
        return forum.save()
        .then(forums => {
            // console.log(forums);
            res.status(200).json(forums);
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