"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = {
    
    // async..await is not allowed in global scope, must use a wrapper
    sendMail: async (userEmail, verifyCode) =>{
        
         // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAILING_USER, // generated ethereal user
          pass: process.env.MAILING_PASS, // generated ethereal password
        },
      });
    
      let mailInfo = {
        from: process.env.MAILING_USER, // sender address
        to: userEmail, // list of receivers
        subject: "MovieTube app", // Subject line
        text: "We send a verify code to you please enter it in MovieTube application\n\n code:   " + verifyCode, // plain text body
      };
    
      // send mail with defined transport object
      await transporter.sendMail(mailInfo, (error, info) =>{
          return { error, info };
      });
    }
}