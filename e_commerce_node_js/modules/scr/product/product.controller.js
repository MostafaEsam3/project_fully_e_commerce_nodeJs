const Product =require ('./../../../database/productModel.js')
const mongoose=require('mongoose')


exports.createProduct=async (req,res)=>{

    try {   
    const newProduct=await Product.create(req.body)
    res.status(201).json({
        message:"created successfuly",
        data:{
            newProduct
        }
    })    
    } catch (error) {
        res.json(error.message)    
    }
}


exports.getAllProduct=async (req,res)=>{
    try {
    const page= req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    let skip= (page - 1) * limit 

    let allProduct=Product.find()
    allProduct=allProduct.skip(skip).limit(limit)

    if(req.query.page){
        const dataNm=await Product.countDocuments()
        if(skip >= dataNm){
         throw new Error ('this page not found')
    }
    }
    allProduct=await allProduct
        res.status(201).json({
     data:{
     allProduct
       }
        })
    } catch (error) {
     res.status(404).json(error.message)  
    }
}

exports.getSpicficProduct=async(req,res)=>{

    try {
        const spicifyProduct= await Product.findById(req.params.id)
        console.log(spicifyProduct)
        if(!spicifyProduct){
            throw new Error("THis product not found")
        }
        res.status(201).json({
            spicifyProduct
            
        })
    } catch (error) {
        res.json(error.message)
        
    }
}


exports.getAccordingCategory=async(req,res)=>{
    try {

        const categoryId = req.body.category;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            throw new Error ("not founded this category")
        }
 const products=await Product.find({category:req.body.category}).select("productName")

 if (products.length ===0){

    res.json("no found product in this category")
 }else{
    
    res.json({
        products
       })  
 }

    } catch (error) {
     res.status(404).json(error.message)
    }

}

exports.updateProduct=async(req,res)=>{
    try {
    let updatedProduct=await Product.findById(req.params.id)
    if(!updatedProduct){
        throw new Error("this product not found to update it")
    }

    updatedProduct=  await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

    res.json({
        message:"update suucessfuly",
        data:{
            updatedProduct
        }
    })
        
    } catch (error) {
        res.json(error.message)
        
    }
}

exports.deleteProduct=async(req,res)=>{
    try {
    let deleteProduct=await Product.findById(req.params.id)
    if(!deleteProduct){
        throw new Error("This product not found to delete it")
    }

    deleteProduct=  await Product.findByIdAndDelete(req.params.id)
    res.json({
        message:"Delete suucessfuly",
        data:null
    })
    } catch (error) {
     res.json(error.message) 
    }

    


}
