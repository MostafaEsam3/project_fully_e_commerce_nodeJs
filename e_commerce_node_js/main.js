const express=require('express')
const app =express()
const morgan=require('morgan')
app.use(express.json())
app.use(morgan('dev'))
const mongoose=require('mongoose')
const user=require('./database/userModel.js')
const initialconnect=require('./database/connection.js')
const userRout = require('./modules/scr/user/user.routes.js')
const categoryRout = require('./modules/scr/category/category.routes.js')
const productRout = require('./modules/scr/product/product.routes.js')
const couponRoute = require('./modules/scr/coupon/coupon.routes.js')
const cartRout = require('./modules/scr/Cart/cart.routes.js')
initialconnect()
app.use(userRout)
app.use(categoryRout)
app.use(productRout)
app.use(couponRoute)
app.use(cartRout)







app.listen(3000,()=>{
    console.log(`im listen in port 3000`)
})



