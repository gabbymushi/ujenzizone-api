const express=require('express');
const router=express.Router();
let membersController = require('../controllers/members');
router.post('/',membersController.create);
router.get('/',membersController.index);
module.exports=router;