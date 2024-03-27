const express=require('express')
const userRout=express.Router()
const {signupSchema, loginSchema, updated}= require('./../../../validation/validation.js')
const validation=require('./../../../validation/schema.validation.js')

const {signup, login,verify, forgetPassword, restrictedTo, updateData,protect}=require('./user.controller.js')

userRout.route('/E/signup').post(validation(signupSchema),signup)

userRout.route('/E/login').post(validation(loginSchema),login)

userRout.route('/E/verify/:token').get(verify);
userRout.route('/E/forgetPassword').post(forgetPassword);

userRout.route('/E/updataData').get(protect,restrictedTo('admin','leader'),updateData);






module.exports=userRout
