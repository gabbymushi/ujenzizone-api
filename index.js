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
users=[];
connections=[];
io.on('connection',socket=>{
  connections.push(socket);
  console.log('Connected: %s sockects connected) ',connections.length);
  socket.on("initial_comments", (data) => {
     socket.join(data.thread_id);
    Comment.findAll({
      where: {
          thread_id: data.thread_id
      },
      include: [
      {
          model:Member,
          as: 'member'
      }],
       limit: 2,
       offset: data.offset,
      order: [
        ['comment_id', 'DESC']
    ],
  })
  .then(comments => {
      //console.log(comments);
      // res.status(200).json(comments);
      //io.sockets.emit("getComments",comments);
      Comment.findAndCountAll({
        where: {
          thread_id: data.thread_id
      },
      }).then(count=> {
        io.sockets.in(data.thread_id).emit("getComments",{comments:comments,totalComments:count});
      })
       
  })
  .catch(err => {
      //res.status(500).json(err)
      console.log(err);
  });
  });
  socket.on("saveComment", comments => {
    socket.join(comments.thread_id);
    let comment = new Comment();
    comment.comment=comments.comment;
    comment.thread_id=comments.thread_id;
    comment.member_id=comments.member_id;
    return comment.save()
    .then(comments => {
        //console.log(comments);
        //res.status(200).json(comments);
        //io.sockets.emit('changeData');
        io.sockets.in(comments.thread_id).emit('changeData');

    })
    .catch(err => {
       // res.status(500).json(err)
       console.log(err);
    });
  
  });
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket),1)
    console.log('Disconnected: %s sockects connected) ',connections.length);
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