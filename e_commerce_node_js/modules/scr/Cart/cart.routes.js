const express=require('express')
const { createCart, updateCart, applyCuoponOnCart } = require('./cart.controller.js')
const { protect } = require('../user/user.controller.js')

const cartRout=express.Router()



cartRout.route('/E/cart').post(protect,createCart)

cartRout.route('/E/cart').patch(protect,updateCart)
cartRout.route('/E/cart/applyCoupon').post(applyCuoponOnCart)




// i get id product from 

// i check if id 



module.exports=cartRout