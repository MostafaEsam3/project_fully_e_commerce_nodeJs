const Joi=require('joi')

exports.signupSchema= Joi.object({
    userName: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict(),
    isVerified: Joi.boolean().default(false),
    role: Joi.string().valid('user', 'admin', 'leader').default('user'),
    address: Joi.array().items(Joi.string())
  });

0

  exports.loginSchema=Joi.object({

    email:Joi.string().email().required(),
    password:Joi.string().required(),

  })


  exports.updated=Joi.object({
    update: Joi.string().min(4).required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    updatedPassword:Joi.string().required(),
    role: Joi.string().valid('user', 'admin', 'leader').default('user').required(),
    confirmPassword: Joi.string().strict(),
  })

  exports.categorySchema=Joi.object({
    categoryName: Joi.string().required(),
    image: Joi.string(),
    createdBy: Joi.string().required() 
});

  



 
