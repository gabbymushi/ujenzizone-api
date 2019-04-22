const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const config = require('./config/_config');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/ujenzizone');
//let db = mongoose.connection;
 require('./database/connection');
//check connection
// db.once('open', function () {
//     console.log('Connected to mangodb');
// });
//check for DB errors
// db.on('error', function (err) {
//     console.log(err)
// });
const app = express();
const server=http.createServer(app);
const io=socketIO(server);
app.use(cors());
app.use(express.json());
//bring in models
//let Member = require('./models/members')
const Comment = require('./models/Comment');
const Member = require('./models/Member');
io.on('connection',socket=>{
  console.log('user connected');
  socket.on("initial_comments", id => {
    Comment.findAll({
      where: {
          thread_id: id
      },
      include: [
      {
          model:Member,
          as: 'member'
      }],
  })
  .then(comments => {
      console.log(comments);
      // res.status(200).json(comments);
      io.sockets.emit("getComments",comments);
  })
  .catch(err => {
      //res.status(500).json(err)
      console.log(err);
  });
  });
  socket.on("saveComment", comments => {
    let comment = new Comment();
    comment.comment=comments.comment;
    comment.thread_id=comments.thread_id;
    comment.member_id=comments.member_id;
    return comment.save()
    .then(comments => {
        console.log(comments);
        //res.status(200).json(comments);
        io.sockets.emit('changeData');
    })
    .catch(err => {
       // res.status(500).json(err)
       console.log(err);
    });
  
  });
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
});
//route files
let member = require('./routes/members');
let forum = require('./routes/forum');
let thread = require('./routes/threads');
let auth = require('./routes/auth');
let comment = require('./routes/comment');
app.use('/api/v1/auth', auth);
app.use('/api/v1/members',validateUser,member);
app.use('/api/v1/forums',validateUser,forum);
app.use('/api/v1/comments',validateUser,comment);
//app.use('/api/v1/forums',forum);
app.use('/api/v1/threads',validateUser,thread);
function validateUser(req, res, next) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,config.secret, function(err, decoded) {
      if (err) {
        res.status(403).json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        //res.json({status:"error", data:decoded.id});
        next();
      }
    });
    
  }
const port = process.env.PORT || 4000;
server.listen(port, () => console.log('Ujenzi zone is running on port ' + port + '...'));