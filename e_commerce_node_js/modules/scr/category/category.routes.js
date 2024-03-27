const express=require('express')

const { getAllCategory, createCategory, deleteCategory, updateCategory, specifyCategory } = require('./category.controller')
const { protect, restrictedTo } = require('../user/user.controller.js')

const categoryRout=express.Router()




categoryRout.route('/E/category')
.get(getAllCategory)
.post(protect,restrictedTo('admin','leader'),createCategory)


categoryRout.route('/E/category/:id')
.patch(protect,restrictedTo('admin','leader'),updateCategory)
.delete(protect,restrictedTo('admin','leader'),deleteCategory)
.get(specifyCategory)










module.exports=categoryRout