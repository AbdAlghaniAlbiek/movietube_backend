const { genSaltSync, hashSync} = require('bcryptjs');


module.exports ={
    hashEncryption: (plainText) =>{
        const salt = genSaltSync(10);
        cipherText = hashSync(plainText, salt);
        return cipherText;
    }
}