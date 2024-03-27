const User = require("../../../database/userModel.js");
const Coupon = require("./../../../database/couponModel.js");
const Product=require('./../../../database/productModel.js');




exports.createCoupon= async (req,res)=>{

    try {

     const createCoupon=await Coupon.create({
     createdBy:req.freshUser._id,
     couponCode:req.body.couponCode,
     value:req.body.value,
     expireIn:req.body.expireIn
       })

    res.json({
        success:"Create sucessfully",
        data:{
         createCoupon
        }
    })    
    } catch (error) {
      res.json(error.message)  
    }
}


exports.getAllCoupon=async (req,res)=>{
try {
 const allCoupon=await Coupon.find();
if(allCoupon.length === 0 ){
    throw new Error("no coupons founded")
}
res.json(allCoupon)


// 204 delete 
// 202 accepted update
// 201 created 
// 200 0k 
// 404 not found 
// 400 bad request

    
} catch (error) {
    res.json(error.message)
    
}

}


exports.updateCoupon=async(req,res)=>{
    try {
    let updateCoupon=await Coupon.findById(req.params.id)
    if(!updateCoupon){
        throw new Error("this product not found to update it")
    }

    const updateFields = {
        ...req.body, 
        updatedBy: req.freshUser._id,
    };

    updateCoupon=  await Coupon.findByIdAndUpdate(req.params.id,{updatedBy:req.freshUser._id},{new:true,runValidators:true})

    res.json({
        message:"update suucessfuly",
        data:{
            updateCoupon
        }
    })
        
    } catch (error) {
     res.json(error.message)  
    }
}



exports.deleteCoupon=async(req,res)=>{
    try {
    let deleteCoupon=await Coupon.findById(req.params.id)
    if(!deleteCoupon){
     throw new Error("this product not found to delete it")
    }
    deleteCoupon=  await Coupon.findByIdAndDelete(req.params.id)
    res.json({
        message:"delete suucessfuly",
        data:null  
    })     
    } catch (error) {
      res.json(error.message)    
 }
}


exports.applyCoupon=async(req,res)=>{

try {
    const currentDate= new Date()
    const findCoupon= await Coupon.findOne({couponCode:req.body.couponCode})

    if(!findCoupon){
    throw new Error("This coupon not found")
    }
    if(findCoupon.expireIn < currentDate ){
    throw new Error("coupon expired sorry")
    }


   // check if product found in couponedProduct 

    for(let i=0 ; i<findCoupon.couponedProduct.length;i++){
    if(findCoupon.couponedProduct[i] == req.body._id )
    {
    throw new Error("Coupon used before sorry")
    }
    }


   const filter = { couponCode: req.body.couponCode };
   const update = {
   $push: { couponedProduct: req.body._id  },
   };


  const updatedCoupon = await Coupon.findOneAndUpdate(filter, update, { new: true });
    let applyDiscountOnProduct= await Product.findOne({_id:req.body._id})
    if(!applyDiscountOnProduct){
    throw new Error("This product not found")
    }

    // appling discount 
    let dicountNum =  applyDiscountOnProduct.price * (findCoupon.value / 100) 
    dicountNum =  applyDiscountOnProduct.price - dicountNum


    // update 
    const finalPrice = await Product.findByIdAndUpdate(applyDiscountOnProduct._id,{priceAfterDiscount:dicountNum}).select('price')
    

    res.status(202).json({
        message:"Update successfully",
        data:{
        finalPrice
    }
    })


} catch (error) {
 res.status(404).json(error.message)
}    

}








