const express=require('express');
const router=express.Router();
let forumController = require('../controllers/ForumController');
router.post('/',forumController.store);
router.get('/',forumController.index);
module.exports=router;