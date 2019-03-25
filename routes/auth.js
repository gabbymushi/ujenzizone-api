const express=require('express');
const router=express.Router();
let authController = require('../controllers/AuthController');
router.post('/login',authController.login);
module.exports=router;