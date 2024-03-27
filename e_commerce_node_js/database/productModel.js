const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
         type: String, 
        required: true,
        unique:true 
    },
    priceAfterDiscount: { 
        type: Number
        },
    price:{
     type: Number,
     required: true 
    },
    image: { type: String }, 
    category: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Category', 
         required: true 
        },
    stock: { 
        type: Number, 
        required: true 
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;