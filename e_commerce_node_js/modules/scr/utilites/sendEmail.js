const nodemailer=require('nodemailer');
const { emailTemp } = require('./templateEmail.js');

exports.sendEmail=async(options)=>{
const transporter = nodemailer.createTransport({
    service:"gmail",
     secure: true,
     auth: {
       user: "mostafaesam3001@gmail.com",
       pass: "ggsw arvy tmbs aicd",
     },
   });
  
     // send mail with defined transport object
     const info = await transporter.sendMail({
       from: '"Mostafa ELmohr👻" <mostafaesam3001@gmail.com>', // sender address
       to: options.email,
       subject: "Hello YA Mohr ✔", // Subject line
       text: "HOLA FROM E-COMMERCE", // plain text body
       html: emailTemp(options.url) , // html body
     });

   
 
}


