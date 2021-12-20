const pool = require('../../config/database');

module.exports = {

    registerOp: (user, verifyCode, callBack) =>{
        pool.query(
            "SELECT email FROM user WHERE email=?",
            [
                user.email
            ],
            (error, userEmail, fields) =>{
                if(error){
                    console.log(error);
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(userEmail.length == 1){
                    var error = "Some one has the same email please enter another one";
                    console.log(error)
                    return callBack(error);
                }

                pool.query(
                    "insert into user(email, password, name, date_join, verify_code)values(?,?,?,NOW(),?)",
                    [
                        user.email,
                        user.password,
                        user.name,
                        verifyCode
                    ],
                    (error, results, fields) => {
                        if(error){
                            console.log(error);
                            return callBack("Error in mysql settings or the request on your query is time out");
                        }
                        else if(!results){
                            var error = "There is error in insert query"
                            console.log(error)
                            return callBack(error);
                        }

                        return callBack(null);
                    }
                );
            });
    },

    verifyOp: (verifyCode, callBack) =>{
        pool.query(
            "SELECT id FROM user WHERE verify_code=?",
            [
                verifyCode
            ],
            (error, userId, fields) =>{
                if(error){
                    console.log(error);
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(userId.length == 0){
                    var error = "Incorrect code";
                    console.log(error)
                    return callBack(error);
                }

                pool.query(
                    "UPDATE user SET verify_code=0 WHERE id=?",
                    [
                        userId[0].id
                    ],
                    (error, results, fields) =>{
                        if(error){
                            console.log(error);
                            return callBack("Error in mysql settings or the request on your query is time out");
                        }
                        else if(!results){
                            var error = "There is error in update query";
                            console.log(error)
                            return callBack();
                        }

                        pool.query(
                            "SELECT id ,email, password, name, date_join FROM user WHERE id=?",
                            [
                                userId[0].id
                            ],
                            (error, userInfo, fields) =>{
                                if(error){
                                    console.log(error);
                                    return callBack("Error in mysql settings or the request on your query is time out");
                                }
                                else if(!userInfo){
                                    var error = "There is an error in select query";
                                    console.log(error)
                                    return callBack(error);
                                }

                                console.log(userInfo);
                                return callBack(null, userInfo);
                            }
                        );
                    }
                );
            }
        );
    },

    loginOp: (user, callBack) =>{
        pool.query(
            "SELECT id FROM user WHERE email=? AND password=?",
            [
                user.email,
                user.password
            ],
            (error, userId, fields) => {
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(userId.length == 0){
                    return callBack("your email or password isn't correct")
                }

                pool.query(
                    "SELECT id ,email, password, name, date_join FROM user WHERE id=?",
                    [
                        userId[0].id
                    ],
                    (error, userInfo, fields) =>{
                        if(error){
                            return callBack("Error in mysql settings or the request on your query is time out");
                        }
                        else if(!userInfo){
                            return callBack("this user not found in MovieTube db");
                        }

                        return callBack(null, userInfo);
                    });
            }
        );
    },

    addUpdateCommentOp: (user, callBack) =>{
        pool.query(
            "SELECT r.id FROM rating r JOIN user u ON u.id = r.user_id JOIN movie m ON m.id = r.movie_id  WHERE m.id = ? AND u.id = ?",
            [
                user.movieId,
                user.userId,
            ],
            (error, userRatingId, fields) =>{
                if(error){
                    return callBack(error);
                }
                else if(userRatingId.length == 0){
                    pool.query(
                        "INSERT INTO rating(user_id,movie_id,comment) VALUES (?,?,?);",
                        [
                            user.userId,
                            user.movieId,
                            user.userComment
                        ],
                        (error, results, field) =>{
                            if(error){
                                return callBack("Error in mysql settings or the request on your query is time out");
                            }
                            else if(!results){
                                return callBack("There are error in insert query");
                            }

                            return callBack(null);
                        }
                    );
                }
                else {
                    pool.query(
                        "UPDATE rating SET comment = ? WHERE user_id=? AND movie_id=?",
                        [
                            user.userComment,
                            user.userId,
                            user.movieId
                        ],
                        (error, results, field) =>{
                            if(error){
                                return callBack(error);
                            }
                            else if(!results){
                                return callBack("There are error in update query");
                            }

                            return callBack(null);
                        }
                    );
                }

                
            }
        );
    },

    addUpdateLikeOp: (userLike, callBack) =>{
        pool.query(
            "SELECT r.id FROM rating r JOIN user u ON u.id = r.user_id JOIN movie m ON m.id = r.movie_id WHERE m.id = ? AND u.id = ?",            
            [
                userLike.movieId,
                userLike.userId
            ],
            (error, userRatingId, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(userRatingId.length == 0){
                    pool.query(
                        "INSERT INTO rating(user_id,movie_id,liked) VALUES (?,?,?);",
                        [
                            userLike.userId,
                            userLike.movieId,
                            userLike.liked
                        ],
                        (error, results, fields) =>{
                            if(error){
                                return callBack("Error in mysql settings or the request on your query is time out");
                            }
                            else if(!results){
                                return callBack("There is error in insert query");
                            }

                            return callBack(null);
                        }
                    );
                }
                else{
                    pool.query(
                        "UPDATE rating SET liked = ? WHERE user_id=? AND movie_id=?",
                        [
                            userLike.liked,
                            userLike.userId,
                            userLike.movieId
                        ],
                        (error, results, fields) =>{
                            if(error){
                                return callBack("Error in mysql settings or the request on your query is time out");
                            }
                            else if(!results){
                                return callBack("There is error in insert query");
                            }

                            return callBack(null);
                        }
                    );
                }
            }
        );
    },

    addUpdateRatingOp: (userRating, callBack) =>{
        pool.query(
            "SELECT r.id FROM rating r JOIN user u ON u.id = r.user_id JOIN movie m   ON m.id = r.movie_id WHERE m.id = ? AND u.id = ?",       
            [
                userRating.movieId,
                userRating.userId
            ],
            (error, userRatingId, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(userRatingId.length == 0){
                    pool.query(
                        "INSERT INTO rating(user_id,movie_id,rating_entertament,rating_resolution,rating_perform_actors) VALUES (?,?,?,?,?);",
                        [
                            userRating.userId,
                            userRating.movieId,
                            userRating.userRatingEntertament,
                            userRating.userRatingResolution,
                            userRating.userRatingPerformActor,
                        ],
                        (error, results, fields) =>{
                            if(error){
                                return callBack("Error in mysql settings or the request on your query is time out");
                            }
                            else if(!results){
                                return callBack("There is error in insert query");
                            }

                            return callBack(null);
                        }
                    );
                }
                else{
                    pool.query(
                        "UPDATE rating SET rating_entertament = ? , rating_resolution = ? , rating_perform_actors = ? WHERE user_id=? AND movie_id=?",
                        [
                            userRating.userRatingEntertament,
                            userRating.userRatingResolution,
                            userRating.userRatingPerformActor,
                            userRating.userId,
                            userRating.movieId
                        ],
                        (error, results, fields) =>{
                            if(error){
                                return callBack("Error in mysql settings or the request on your query is time out");
                            }
                            else if(!results){
                                return callBack("There is error in update query");
                            }

                            return callBack(null);
                        }
                    );
                }
            }
        );
    },

    getLikeOp: (movieId, userId, callBack) =>{
        pool.query(
           "SELECT liked "
           +"FROM rating "
           +"WHERE user_id = ? AND movie_id = ?",
            [
                userId,
                movieId
                
            ],
            (error, liked, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }

                return callBack(null, liked.length == 0 ? 0 : liked[0].liked);
            }
        );
    },

    getLikeRatingsCommentOp: (movieId, userId, callBack) =>{
        pool.query(
           "SELECT distinct r.liked,r.rating_entertament,r.rating_resolution,r.rating_perform_actors,r.comment FROM user u  JOIN rating r  ON u.id = r.user_id JOIN movie m  ON m.id = r.movie_id JOIN favourite f  ON m.id = f.movie_id WHERE m.id = ? AND u.id = ?",
            [
                movieId,
                userId
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(results.length == 0){
                    return callBack("There is error in select query");
                }

                return callBack(null, results[0]);
            }
        );
    }
}
