const { sendEmail } = require('../utilites/sendEmail.js')
const User=require('./../../../database/userModel.js')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


const makeToken=(ID)=>{
 return jwt.sign({id:ID},'project') 
}

exports.signup = async(req,res)=>{
    try {
     const newuser=await User.create(req.body)
     

    const token= makeToken(newuser._id)
     sendEmail({email:req.body.email,url:`http://localhost:3000/E/verify/${token}`})
     res.status(201).json({
     message:"sucsess to login",
    token:token,
    data:{
        user:newuser,
    }
     })

    } catch (error) {
        res.status(404).json(error.message)     
    }
}



//--------------------------------------------------------

exports.login=async(req,res)=>{
    try {     
    const emailLogin=await User.findOne({email:req.body.email,isVerified:true})
   if(!emailLogin || !(await emailLogin.correctPassword(req.body.password,emailLogin.password))){
    throw new Error("uncorrect email or password or need to verify")
   }
    res.status(201).json({
    message:"success login",
    token:makeToken(emailLogin._id),
    data:{
    user:emailLogin.userName
    }
   })    
    } catch (error) {
        res.json(error.message)   
    }}


    exports.verify=(req,res)=>{

       try {

        jwt.verify(req.params.token,'project',async (err,decoded)=>{
            if(err){
                throw new Error("invalid token")
            }else{
              const getToVerify=  await User.findByIdAndUpdate(decoded.id,{isVerified:true},{new:true})
              if(!getToVerify){
                throw new Error("invalid email or need to signup again")
              }else{
                res.json({
                    message:"verifyed successfuly"
                })
              }
            }
        })
    
        
       } catch (error) {
        res.json(error.message)
        
       }



    }

//-----------------------------------------------

exports.forgetPassword=async(req,res)=>{

    try {

        const userEmail=await User.findOne({email:req.body.email})
        if(!userEmail){
            throw new Error("This email not Founded")
        }
        const resetPassword= userEmail.createPasswordResetToken();
        await userEmail.save({validateBeforeSave:false})

    } catch (error) {
        res.status(404).json({
            message:error.message
        })
        
    }

   


}
exports.resetPassword=async(req,res)=>{

}


 exports.restrictedTo=(...roles)=>{
    return (req,res,next)=>{

        try {
            if(!(roles.includes(req.freshUser.role)) ){
             throw new Error("You must be an admin")
            }
            next();
            
        } catch (error) {
         res.json(error.message)
        }
       
    }
}

exports.updateData=async(req,res)=>{

    try {    
        const emailLogin=await User.findOne({email:req.body.email,isVerified:true})
       if(!emailLogin || !(await emailLogin.correctPassword(req.body.password,emailLogin.password))){
        throw new Error("uncorrect email or password or need to verify")
       }else{
      const updatedPassword=  await User.findOneAndUpdate({email:emailLogin.email},{$set:{password:await  bcrypt.hash(req.body.updatedPassword,10)}})
       }
        res.status(201).json({
        message:"success updated",
        // data:{
        // user:updatedPassword
        // }
       })    
        } catch (error) {
            res.json(error.message)   
        }
}




// this powerfull func 
exports.protect=async (req,res,next)=>{
    let token;
     //CHECK IF AOUTHRIZATION IS PRESENT 
 
     try {
         if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         
             token=req.headers.authorization.split(' ')[1]  
        }
        // CHECK IF TOKEN IS PRISEST 
        if(!token){
         throw new Error("You must pass to me token")
        }
 
  // VERIFING TOKEN
      let decod;
        jwt.verify(token,'project',(err,decoded)=>{
         if(err){
             throw new Error("You must not change token")
             }
         if(decoded){
             decod=decoded
         }
     })
 
     //CHEEK IF IT FRESHUSER AND NOT DELETED 
        const freshUser=await User.findById(decod.id)
        // console.log(freshUser)
        if(!freshUser){
         throw new Error("user might deleted or need to login again")
        } 
         
        req.freshUser=freshUser
        next()
        // jonas make some advansed about changing user to his password and i not make it  now 
        // but you still not forget it section (10- edipose 9)
 
     } catch (error) {
         res.json(error.message)
         
     }
 
 }

 

 
// exports.protect=async (req,res,next)=>{

//     try {
//          //CHECK IF AOUTHRIZATION IS PRESENT 
//          let token;
//          if(req.headers.authorization || req.headers.authorization.startWith('Bearer')){
 
//              token=req.headers.authorization.split(' ')[1]
//          }
//          if(!token){
//             throw new Error("You must send me a token")
//          }
//          let decod;

//          jwt.verify(token,'project',async (err,decoded)=>{
//             if(err){
//                 throw new Error("Invalid token");
//             }else{
//                 decod=decoded.id
//             }

//       //CHEEK IF IT FRESHUSER AND NOT DELETED 

//       const freshUser=await User.findById(decod)
//       if(!freshUser){
//         throw new Error("User might deleted or must need signup again");
//       }
//             // i pass it to can check on freshUser Role
//       req.freshUser=freshUser;
//       console.log(req.freshUser._id)
//         next()
//          })

        
//     } catch (error) {
//     res.status(404).json(error.message)

//     }

// }
