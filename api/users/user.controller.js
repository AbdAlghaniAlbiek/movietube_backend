const { jwtVerify } = require('../../security/jwt_authorization');
const {
    registerOp,
    loginOp,
    verifyOp,
    addUpdateCommentOp,
    addUpdateLikeOp,
    addUpdateRatingOp,
    getLikeOp,
    getLikeRatingsCommentOp
} = require('./user.service');

require('dotenv').config();
const { jwtSign } = require('../../security/jwt_authorization');
const { aesDecryption, aesEncryption } = require('../../security/aes_algorithm');
const { hashEncryption } = require('../../security/hash_algorithm');
const { genRandomValue } = require('../../helper/gen_random_value');
const { sendMail } = require('../../mail/mailing_service');


module.exports = {

    register: (req, res) =>{
        if(!req.body){
            var error = "Some parameters not found";
            console.log(error);
            return res.status(200).json({
                result: null,
                errorMessage: aesEncryption(error),
            });
        }

        const verifyCode = genRandomValue();
        var user = {
            email: aesDecryption(req.body.email),
            password:aesDecryption(req.body.password),
            name: aesDecryption(req.body.name)
        };
        
        registerOp(user, verifyCode, (error) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            const sendingMailResult = sendMail(user.email, verifyCode);
            if(sendingMailResult.error){
                console.log(sendingMailResult.error);
                return res.status(200).json({
                    result:null,
                    errorMessage: aesEncryption("There is error in sending mail service")
                    });
            }

            res.status(200).json({
                result:aesEncryption("Email is sended successfully"),
                errorMessage:""
            });
        });
    },

    verify: (req, res) =>{

        if(!req.body.verifyCode){
            var error = "Some parameters not found";
            console.log(error);
            return res.status(200).json({
                result:null,
                errorMessage: aesEncryption(error)});
        }

        const verifyCode = aesDecryption(req.body.verifyCode);
        
        verifyOp(verifyCode, (error, user) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }
            
            const email = hashEncryption(aesEncryption(user[0].email));
            const password = hashEncryption(aesEncryption(user[0].password));

            let dateObj = new Date();
            let timeExpiredToken = undefined;
            const currentDate = dateObj.getHours();
            if(currentDate >= 11){
                timeExpiredToken = currentDate - 10;
            }
            else{
                timeExpiredToken = currentDate + 2;
            }

            const token = jwtSign({ 
                email:email, 
                password:password, 
                expiredIn: aesEncryption(timeExpiredToken.toString()),
                secretKeyword: aesEncryption(process.env.SECRET_KEYWORD) 
                });

            return res.status(200).json({
                result:{
                    id: user[0].id,
                    email: aesEncryption(user[0].email),
                    password: aesEncryption(user[0].password),
                    name: aesEncryption(user[0].name),
                    dateJoin: aesEncryption(user[0].date_join.toString()),
                    token:token
                    },
                errorMessage:""
            });
        });
    },

    login: (req, res) =>{
        if(!req.body){
            var error = "Some parameters not found";
            console.log(error);
            return res.status(200).json({
                result:null,
                errorMessage: aesEncryption(error)});
        }

        var email = aesDecryption(req.body.email);
        var password = aesDecryption(req.body.password) ;

        var user = {
            email:email,
            password:password
        };
        loginOp(user, (error, userInfo) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            const email = hashEncryption(aesEncryption(userInfo[0].email));
            const password = hashEncryption(aesEncryption(userInfo[0].password));

            let dateObj = new Date();
            let timeExpiredToken = undefined;
            const currentDate = dateObj.getHours();
            if(currentDate >= 11){
                timeExpiredToken = currentDate - 10;
            }
            else{
                timeExpiredToken = currentDate + 2;
            }

            const token = jwtSign({ 
                email:aesEncryption(email), 
                password:aesEncryption(password), 
                expiredIn:aesEncryption(timeExpiredToken.toString()),
                secretKeyword:aesEncryption(process.env.SECRET_KEYWORD) 
                });

            return res.status(200).json({
                result:{
                    id: userInfo[0].id,
                    email: aesEncryption(userInfo[0].email),
                    password: aesEncryption(userInfo[0].password),
                    name: aesEncryption(userInfo[0].name),
                    dateJoin: aesEncryption(userInfo[0].date_join.toString()),
                    token:token
                },
                errorMessage:""
            });
        });
    },

    addUpdateComment: (req, res) =>{

        if(!req.body){
            var error = "There are missing parameters";
            console.log(error);
            return res.status(200).json({
                result:null,
                errorMessage:aesEncryption(error)
            });
        }

        // const token = req.get('authorization');
        // let authError = jwtVerify(token);
        // if(authError){
        //     console.log(authError);
        //     return res.status(200).json({
        //         result:null,
        //         errorMessage:aesEncryption(authError)
        //     });
        // }
        
        var params = {
            userId: req.body.userId,
            movieId: req.body.movieId,
            userComment: aesDecryption(req.body.userComment) 
        }
        addUpdateCommentOp(params, (error) =>{
            if(error){
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)
                });
            }

            return res.status(200).json({
                result:aesEncryption("successful operation"),
                errorMessage:""
            });
        });
    },

    addUpdateLike: (req, res) =>{

        if(!req.body){
            var error = "There are missing parameters";
            console.log(error);
            return res.status(200).json({
                result:null,
                errorMessage:aesEncryption(error)});
        }

        // const token = req.get('authorization');
        // let authError = jwtVerify(token);
        // if(authError){
        //     console.log(authError);
        //     return res.status(200).json({
        //         result:null,
        //         errorMessage:aesEncryption(authError)});
        // }
        
        var params = {
            userId: req.body.userId,
            movieId: req.body.movieId,
            liked: aesDecryption(req.body.liked) 
        }
        addUpdateLikeOp(params, (error) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            return res.status(200).json({
                result:aesEncryption("successful operation"),
                errorMessage:""
                });
        });
    },

    addUpdateRating: (req, res) =>{

        if(!req.body){
            var error= "There are missing parameters";
            console.log(error);
            return res.status(200).json({
                result:null,
                errorMessage:aesEncryption(error)});
        }

        // const token = req.get('authorization');
        // let authError = jwtVerify(token);
        // if(authError){
        //     console.log(authError);
        //     return res.status(200).json({
        //         result:null,
        //         errorMessage:aesEncryption(authError)});
        // }
        
        var params = {
            userId: req.body.userId,
            movieId: req.body.movieId,
            userRatingEntertament: aesDecryption(req.body.userRatingEntertament),
            userRatingResolution: aesDecryption(req.body.userRatingResolution),
            userRatingPerformActor: aesDecryption(req.body.userRatingPerformActor),
        }
        addUpdateRatingOp(params, (error) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            return res.status(200).json({
                result:aesEncryption("successful operation"),
                errorMessage:""
            });
        });
    },

    getLike: (req, res) =>{

        if(!req.query.userId || !req.query.movieId){
            var error = "There are missing parameters";
            console.log(error);
            return res.status(200).json({
                result:null,
                errorMessage:aesEncryption(error)});
        }

        // const token = req.get('authorization');
        // let authError = jwtVerify(token);
        // if(authError){
        //     console.log(authError);
        //     return res.status(200).json({
        //         result:null,
        //         errorMessage:aesEncryption(authError)});
        // }
        
        getLikeOp(req.query.movieId, req.query.userId, (error, liked) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            return res.status(200).json({
                    result: liked == 0 ? aesEncryption((0).toString()) : aesEncryption(liked.toString()),
                    errorMessage:""
                });
        });
    },

    getLikeRatingsComment: (req, res) =>{
        
        if(!req.query.userId || !req.query.movieId){
            var error = "There are missing parameters";
            console.log(error);
            return res.status(200).json({
                result:null,
                errorMessage:aesEncryption(error)});
        }

        // const token = req.get('authorization');
        // let authError = jwtVerify(token);
        // if(authError){
        //     console.log(authError);
        //     return res.status(200).json({
        //         result:null,
        //         errorMessage:aesEncryption(authError)});
        // }
        
        getLikeRatingsCommentOp(req.query.movieId, req.query.userId, (error, results) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            var comment = null;

            if (results.comment !== null) {comment = aesEncryption(results.comment);}
            else comment = "";

            return res.status(200).json({
                result:{
                    liked: aesEncryption(results.liked.toString()),
                    rating_entertament: aesEncryption(results.rating_entertament.toString()) ,
                    rating_resolution: aesEncryption(results.rating_resolution.toString()),
                    rating_perform_actors: aesEncryption(results.rating_perform_actors.toString()),
                    comment:comment
                },
                errorMessage:""
            });
        });
    }
}