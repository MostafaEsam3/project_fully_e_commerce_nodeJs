const Category=require('./../../../database/categoryModel.js')




exports.getAllCategory=async (req,res)=>{



    try {
        const allCategory= await Category.find()

        res.status(201).json({
            data:{
                allCategory
            }
        })
        

        
    } catch (error) {

        res.status(404).json(error.message)
        
    }



}







exports.createCategory=async(req,res)=>{
    try {
        const newCategory= await Category.create({
            createdBy:req.freshUser._id,
            categoryName:req.body.categoryName
        }
     )
    
      res.json(newCategory)
        
    } catch (error) {
        res.json(error.message)

        
    }

   

}

exports.specifyCategory=async (req,res)=>{

    try {
        const specifyCategory=await Category.findById(req.params.id)
        if(!specifyCategory){
            throw new Error("NOT FOUNDED THIS SPECFIC CATEGORY")
        }
        res.status(201).json({
            data:{
                specifyCategory
                }
        })

        
    } catch (error) {
        res.status(404)
        .json(error.message)
    }



}


exports.deleteCategory=async (req,res)=>{
    try {
        const deletedCategory=  await Category.findByIdAndDelete(req.params.id)
        if(!deletedCategory){
        throw new Error("not founded it to delete")
        }
        res.status(201).json({
            data:null
        })
        
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
        
    }
}


exports.updateCategory=async(req,res)=>{

   try {
    const updatedCategory=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!updatedCategory){
        throw new Error("Not found this category")
    }
    res.status(201).json({
        message:"success",
        data:{
            updatedCategory
        }
    })
    
   } catch (error) {
    res.status(404).json({
        message:error.message

    })
    
   }
    
}