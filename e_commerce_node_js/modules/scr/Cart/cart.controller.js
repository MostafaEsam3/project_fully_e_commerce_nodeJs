const { x } = require("joi")
const Cart = require("../../../database/cartModel.js")
const Product = require("../../../database/productModel.js")
const Coupon= require('./../../../database/couponModel.js')




exports.createCart=async(req,res)=>{

    // for loope to check if amount not moreThan actal stock
try {

    let {productId,quantity}= req.body

// check if product found by geting id from body 
let findProduct= await Product.findById(productId)

// check if not found 
if(!findProduct){
    throw new Error("Product not found")
}
if (findProduct.stock < req.body.quantity){
   throw new Error("no enough stock")
}


let foundCart=await Cart.findOne({userId:req.freshUser._id})
if(foundCart){
 throw new Error("This cart already found if you need add any thing go to update it")
}

let createCart = await Cart.create({userId:req.freshUser._id})

const totalPrice= (findProduct.priceAfterDiscount || findProduct.price ) * (quantity || 1);

let updatedData = {
    productId: productId,
    quantity
};

 let inserted = await Cart.findByIdAndUpdate(
    createCart._id,
    { $push: { products: updatedData },
       totalPrice : totalPrice
},
    { new: true }
);

 res.status(202).json({
    message:"create succesfully",
    data:{
        inserted

    }
 })


} catch (error) {
res.json(error.message)
}
    
}

exports.updateCart=async (req,res)=>{
    try {
        


    const {productId,quantity} = req.body
     
     let qu;
     let priceCount;
     let notFound = false;
    const getCart= await Cart.findOne({userId:req.freshUser._id})
    for(let i=0 ; i<getCart.products.length;i++){

        if(getCart.products[i].productId == req.body.productId){
         notFound=true
         qu= getCart.products[i].quantity+1
        }

    }
    if(notFound){
        console.log(notFound)
    let findProduct = await Product.findById(req.body.productId)

    priceCount= getCart.totalPrice + ((quantity || 1 )* (findProduct.price)) 

    if (findProduct.stock < qu){
        throw new Error("no enough stock")
     }
     


    let object={
      quantity:qu,
      productId:req.body.productId

    }

const x = await Cart.updateOne(
    {
        userId: req.freshUser._id,
        "products.productId": productId,
    },
    {
        $set: {
            "products.$.quantity": qu,
            totalPrice: priceCount,
        },
    }
);
      
   res.status(202).json({
            message:"updated",
            data:{
                x
            }   
        })
    }
 else {
    let findProduct = await Product.findById(productId);
    console.log(getCart.totalPrice )

  const  priceCount = getCart.totalPrice + ((quantity || 1) * findProduct.price);

  if (findProduct.stock < quantity){
    throw new Error("no enough stock")
 }
 


    let updatedData = {
        productId: productId,
        quantity: quantity || 1,
    };

    const updatedCart = await Cart.findByIdAndUpdate(
        getCart._id,
        {
            $push: { products: updatedData },
            totalPrice: priceCount,
        },
        { new: true }
    );
    res.status(200).json({
        message: "Product added to the cart",
        data: {
        updatedCart,
        },
    });
}
}catch (error) {
    res.json(error.message)
        
    }









    


}



exports.applyCuoponOnCart=async (req,res)=>{

 const findApply = await Coupon.findOne({couponCode:req.body.couponCode})

 for(let i=0 ; i<findApply.couponedProduct.length;i++){

     if(findApply.couponedProduct[i] == req.body.productId){
       throw new Error("this applied before")
    }


}


  
    


}


