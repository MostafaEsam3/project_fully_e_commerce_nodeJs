const mongoose=require('mongoose')

const initialconnect = ()=>{
    mongoose.connect(`mongodb://localhost:27017/Ecommerce`).then(()=>
    console.log("connect to dataBase")).catch((err)=> console.log(`conection error ${err}`)
    )
}  
module.exports=initialconnect

