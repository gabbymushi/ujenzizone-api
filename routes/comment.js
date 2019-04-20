const express=require('express');
const router=express.Router();
let commentController = require('../controllers/CommentController');
router.post('/',commentController .store);
router.get('/:id',commentController.index);
module.exports=router;