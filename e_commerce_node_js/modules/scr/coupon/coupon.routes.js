const express=require('express')
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, applyCoupon } = require('./coupon.controller.js')
const { protect, restrictedTo } = require('../user/user.controller.js')
const couponRoute=express.Router()

couponRoute.route('/E/coupon').post(protect,restrictedTo('admin','adminstrator'),createCoupon)

couponRoute.route('/E/coupon').get(getAllCoupon)

couponRoute.route('/E/coupon/:id')
.patch(protect,restrictedTo('admin','adminstrator'),updateCoupon)
.delete(protect,restrictedTo('admin','adminstrator'),deleteCoupon)

// protect which i ref before

couponRoute.route('/E/apply').patch(protect,applyCoupon)






module.exports=couponRoute