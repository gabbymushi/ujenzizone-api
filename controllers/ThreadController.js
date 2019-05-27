const Thread = require("../models/Thread");
const Forum = require("../models/Forum");
const Member = require("../models/Member");
const File = require("../models/File");

module.exports = {
  index: function(req, res, next) {
    //return res.status(200).json(req.params.id)
    // console.log('uu',req.params.offset);
    Thread.findAll({
      where: {
        forum_id: req.params.id
      },
      include: [
        {
          model: Forum,
          as: "forum"
        },
        {
          model: Member,
          as: "member"
        }
      ],
      limit: 2,
      offset: parseInt(req.params.offset),
      order: [["thread_id", "DESC"]]
    })
      .then(threads => {
         console.log('uu',req.params.offset);
        //res.status(200).json(threads);
        Thread.count({
          where: {
            forum_id: req.params.id
          }
        }).then(count => {
          res.status(200).json({ threads: threads, totalThreads: count });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  store: function(req, res, next) {
    console.log(req.files[0].fieldname);
    //return;
    let thread = new Thread();
    thread.title = req.body.title;
    thread.body = req.body.body;
    thread.forum_id = req.body.forum_id;
    thread.member_id = req.body.member_id;
    return thread
      .save()
      .then(threads => {
        //  console.log(threads);
        // res.status(200).json(threads);
        for(var i=0;i<req.files.lenght;i++){
        let file = new File();
        file.file_name = req.file[i].filename;
        file.mime_type = req.file.mimetype;
        file.thread_id = threads.thread_id;
        file.save();
        }
        res.status(200).json("success")
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getThreadById: function(req, res, next) {
    Thread.findOne({
      where: {
        thread_id: req.params.id
      },
      include: [
        {
          model: Forum,
          as: "forum"
        },
        {
          model: Member,
          as: "member"
        },
        {
          model: File,
          as: "file"
        }
      ]
    })
      .then(threads => {
        // console.log(threads);
        res.status(200).json(threads);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  edit: function(req, res, next) {},
  update: function(req, res, next) {},
  delete: function(req, res, next) {}
};
