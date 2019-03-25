const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ujenzizone');
let db = mongoose.connection;
//check connection
db.once('open', function () {
    console.log('Connected to mangodb');
});
//check for DB errors
db.on('error', function (err) {
    console.log(err)
});
const app = express();
app.use(cors());
app.use(express.json());
//bring in models
let Member = require('./models/members')

//route files
let member = require('./routes/members');
let auth = require('./routes/auth');
app.use('/api/v1/auth', auth);
app.use('/api/v1/members',validateUser,member);
function validateUser(req, res, next) {
    //res.json({status:"error",data:req.headers['x-access-token']});
    jwt.verify(req.headers['x-access-token'],config.secret, function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        //res.json({status:"error", data:decoded.id});
        next();
      }
    });
    
  }
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Ujenzi zone is running on port ' + port + '...'));