const express=require('express');
const router=express.Router();
let commentController = require('../controllers/CommentController');
router.post('/',commentController .store);