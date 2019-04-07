const Comment = require('../models/comments');
module.exports = {
    index: function (req, res, next) {
        Comment.find({})
        .exec()
        .then(comments => {
            console.log(comments);
            res.status(200).json(comments);
        })
        .catch(err => {
            res.status(500).json(err)
        });
    },
}