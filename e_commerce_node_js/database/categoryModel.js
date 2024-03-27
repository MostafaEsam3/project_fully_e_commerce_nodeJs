const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    categoryName: { 
        type: String, 
        required: true ,
        unique:true
    },
    image: {
    type: String 
        },
    createdBy:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
     required: true 
    }
});





const Category=mongoose.model('Category',categorySchema)

module.exports=Category