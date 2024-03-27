const express =require('express')
const { createProduct, getAllProduct, getSpicficProduct, getAccordingCategory, updateProduct, deleteProduct } = require('./product.controller.js')
const { protect, restrictedTo } = require('../user/user.controller.js')
const productRout=express.Router()

productRout.route('/E/product')
.post(protect,restrictedTo('admin','administrator'),createProduct)
.get(getAllProduct)


productRout.route('/E/product/:id').get(getSpicficProduct)
productRout.route('/E/productCategory').get(getAccordingCategory)
productRout.route('/E/product/:id')
.patch(protect,restrictedTo('admin','adminstrator'),updateProduct)
.delete(protect,restrictedTo('admin','administrator'),deleteProduct) 
module.exports=productRout


