const Comment = require('../models/Comment');
module.exports = {
    index: function (req, res, next) {
        Comment.find({
            where: {
                thread_id: req.params.id
            },
        })
        .exec()
        .then(comments => {
            console.log(comments);
            res.status(200).json(comments);
        })
        .catch(err => {
            res.status(500).json(err)
        });
    },
    store: function (req, res, next) {
        let comment = new Comment();
        comment.comment=req.body.comment;
        comment.thread_id=req.body.thread_id;
        comment.member_id=req.body.userId;
        return comment.save()
        .then(comments => {
            console.log(comments);
            res.status(200).json(comments);
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