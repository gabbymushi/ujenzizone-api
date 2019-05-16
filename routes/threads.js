const express=require('express');
const router=express.Router();
let threadController = require('../controllers/ThreadController');
router.get('/:id/offset/:offset',threadController.index);
router.get('/:id/',threadController.getThreadById);
router.post('/',threadController.store);
module.exports=router;