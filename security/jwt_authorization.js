require('dotenv').config();
const { aesEncryption } = require('./aes_algorithm');
const { sign, verify } = require('jsonwebtoken');

module.exports = {
    jwtSign: (data) =>{
        token = sign(
            data,
            process.env.JWT_AUTH_KEY,
            {
                expiresIn:"2h"
            });
        return token;
    },

    jwtVerify: (req,res,next) =>{

        var token = req.get("authorization");
        
        if(token){
            token = token.slice(7);
            if (token.toString() !== "") {
                
                    verify(token, process.env.JWT_AUTH_KEY, (err, decoded) =>{
                    if(err){
                        return res.status(200).json({
                                                result:null,
                                                errorMessage:aesEncryption("Invalid token")
                                            });
                    }
                    next();
                });

            }
            else{
                return res.status(200).json({
                                        result:null,
                                        errorMessage:aesEncryption("Access denied! unauthorized user")
                                    });
            }
            
        }
        else{
            return res.status(200).json({
                                    result:null,
                                    errorMessage:aesEncryption("Access denied! unauthorized user")
                                });
        }
    }
}