const express=require('express');
// const { registerUser } = require('../controller/auth.controller');
// const { registerUser, loginUser } = require('../controller/auth.controller');
const authcontroller=require('../controller/auth.controller')

const router=express.Router();

//Auth API for User
router.post('/user/register',authcontroller.registerUser);
router.post('/user/login',authcontroller.loginUser)
router.get('/user/logout',authcontroller.logoutUser)


//Auth API for Food-Partner
router.post('/food-partner/register',authcontroller.registerfoodPartner);
router.post('/food-partner/login',authcontroller.loginFoodPartner);
router.get('/food-partner/logout',authcontroller.logoutfoodPartner);

module.exports=router;