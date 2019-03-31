const express=require('express');
const router=express.Router();
let threadController = require('../controllers/ThreadController');
router.get('/',threadController.index);
router.post('/',threadController.store);
module.exports=router;