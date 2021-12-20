require('dotenv').config();
const cryptoObj = require('crypto');
const encryptionType = 'aes-128-cbc';
const encryptionEncoding = 'base64';
const bufferEncryption = 'utf-8';

module.exports = {
    aesEncryption: (plainText) =>{
        const aesKey = process.env.AES_KEY;
        const aesIV = process.env.AES_IV;

        const key = Buffer.from(aesKey, bufferEncryption);
        const iv = Buffer.from(aesIV, bufferEncryption);
        const cipher = cryptoObj.createCipheriv(encryptionType, key, iv);
        let cipherText = cipher.update(plainText, bufferEncryption, encryptionEncoding);
        cipherText += cipher.final(encryptionEncoding);
        return cipherText;
    },

    aesDecryption: (cipherText)=>{
        const aesKey = process.env.AES_KEY;
        const aesIV = process.env.AES_IV;

        const buff = Buffer.from(cipherText, encryptionEncoding);
        const key = Buffer.from(aesKey, bufferEncryption);
        const iv = Buffer.from(aesIV, bufferEncryption);
        const decipher = cryptoObj.createDecipheriv(encryptionType, key, iv);
        const plainText = decipher.update(buff) + decipher.final();
        return plainText;
    }
}