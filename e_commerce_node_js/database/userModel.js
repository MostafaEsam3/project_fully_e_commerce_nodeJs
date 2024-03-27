const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const crypto=require('crypto')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minlength:4,
        unique:true

        },
    email:{
        type:String,
        required:true,
        unique:true


    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return value === this.password;
        },
        message: 'Passwords do not match',
    }
},
isVerified:{
    type:Boolean,
    default:false,
},
role:{
    type:String,
    enum:['user','admin','leader'],
    default:'user'
},
address:[String],
passwordResetToken:String,
passwordResetExpires:Date


})

userSchema.pre('save', async function(next){
    if(!this.isModified('password') )return next();

    this.password=await bcrypt.hash(this.password, 10) 
    this.confirmPassword=undefined
    next() ;

})

userSchema.methods.correctPassword= async function(candidatePassword,ActualPassword){
    return await bcrypt.compare(candidatePassword,ActualPassword)
}


userSchema.methods.createPasswordResetToken=function(){
    const ResetToken=crypto.randomBytes(32).toString('hex')
    this.passwordResetToken=crypto.createHash('sha256').update(ResetToken).digest('hex')
    this.passwordResetExpires=Date.now() + 10 *60*1000
    return ResetToken;
}

















// userSchema.methods.correctPassword = async function(enteredPassword, userPassword) {
//     return await bcrypt.compare(enteredPassword, userPassword);
    
// };


 const User=mongoose.model("User",userSchema)
 
    // const x =async()=>{
    //     await User.deleteMany()
    // }
    //  x()

module.exports=User
 