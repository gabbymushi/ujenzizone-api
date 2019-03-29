const express=require('express');
const router=express.Router();
let authController = require('../controllers/AuthController');
router.post('/login',authController.login);
router.post('/register',authController.create);
module.exports=router;