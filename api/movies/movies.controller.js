const { jwtVerify } = require('../../security/jwt_authorization');
const {
    getBestMoviesOp,
    getMovieActorsOp,
    getMovieCommentsOp,
    getMovieCountCommentsLikesRatingsOp,
    getMovieDescriptionOp,
    getMovieImagesOp
} = require('./movies.service');
const { aesEncryption } = require('../../security/aes_algorithm');

module.exports = {

    getBestMovies: (req, res) =>{
       
        // const token = req.get('authorization');
        // let authError = jwtVerify(token);
        // if(authError){
        //     console.log(authError);
        //     return res.status(200).json({
        //         result:null,
        //         errorMessage:aesEncryption(authError)});
        // }

        getBestMoviesOp((error, movies) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            var encMovies = new Array();
            for (let i = 0; i < movies.length; i++) {
                encMovies.push({
                    category_name: aesEncryption(movies[i].category_name),
                    id:movies[i].id,
                    movie_name: aesEncryption(movies[i].movie_name),
                    description: aesEncryption(movies[i].description),
                    rate:aesEncryption(movies[i].rate.toString()) ,
                    image_path:aesEncryption(movies[i].image_path) 
                }); 
            }

            return res.status(200).json({
                result:encMovies,
                errorMessage:""});
        });
    },

    getMovieActors: (req, res) =>{

        if(!req.query.movieId){
            var error = "There is some missing parameters";
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
        
        getMovieActorsOp(req.query.movieId, (error, actors) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            var encMovieActors = new Array();
            for (let i = 0; i < actors.length; i++) {
                encMovieActors.push({
                    id:actors[i].id,
                    name: aesEncryption(actors[i].name),
                    image_path: aesEncryption(actors[i].image_path),
                }); 
            }

            return res.status(200).json({
                result:encMovieActors,
                errorMessage:""});
        });
    },

    getMovieComments: (req, res) =>{
        
        if(!req.query.movieId){
            var error = "There is some missing parameters";
            console.log(error)
            return res.status(200).json({
                result:null,
                errorMessage:aesEncryption(error)});
        }

        // const token = req.get('authorization');
        // let authError = jwtVerify(token);
        // if(authError){
        //     console.log(authError)
        //     return res.status(200).json({
        //         result:null,
        //         errorMessage:aesEncryption(authError)});
        // }

        getMovieCommentsOp(req.query.movieId, (error, comments) =>{
            if(error){
                console.log(error)
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            var encMovieComments = new Array();
            for (let i = 0; i < comments.length; i++) {
                encMovieComments.push({
                    id:comments[i].id,
                    name: aesEncryption(comments[i].name),
                    image_path: aesEncryption(comments[i].image_path),
                    comment: aesEncryption(comments[i].comment),
                }); 
            }

            return res.status(200).json({
                result:encMovieComments,
                errorMessage:""});
        });
    },

    getMovieCountCommentsLikesRatings: (req, res) =>{

        if(!req.query.movieId){
            var error = "There is some missing parameters";
            console.log(error)
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
        
        getMovieCountCommentsLikesRatingsOp(req.query.movieId, (error, results) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            // var encResults = new Array();
            // for (let i = 0; i < results.length; i++) {
            //     encResults.push(); 
            // }

            return res.status(200).json({
                result:{
                    id:results.id,
                    count_comments: aesEncryption(results.count_comments.toString()),
                    count_like: aesEncryption(results.count_like.toString()),
                    count_dislike: aesEncryption(results.count_dislike.toString()),
                    count_ratings: aesEncryption(results.count_ratings.toString()),
                    avg_rating_entertament: aesEncryption(results.avg_rating_entertament.toString()),
                    rating_resolution: aesEncryption(results.rating_resolution.toString()),
                    rating_perform_actors: aesEncryption(results.rating_perform_actors.toString()),
                },
                errorMessage:""
            });
        });
    },

    getMovieDescription: (req, res) =>{

        if(!req.query.movieId){
            var error = "There is some missing parameters";
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

        getMovieDescriptionOp(req.query.movieId, (error, movieDetails) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            return res.status(200).json({
                result:{
                    id:movieDetails.id,
                    name: aesEncryption(movieDetails.name),
                    description: aesEncryption(movieDetails.description),
                    rate: aesEncryption(movieDetails.rate.toString()),
                    movie_path: aesEncryption(movieDetails.movie_path),
                    trailer_path: aesEncryption(movieDetails.trailer_path),
                    release_date: aesEncryption(movieDetails.release_date.toString()),
                    banner: aesEncryption(movieDetails.banner),
                    poster: aesEncryption(movieDetails.poster)
                },
                errorMessage:""
            });
        });
    },

    getMovieImages: (req, res) =>{

        if(!req.query.movieId){
            var error = "There is some missing parameters";
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

        getMovieImagesOp(req.query.movieId, (error, movieImages) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }
            
            var encMovieImages = new Array();
            for (let i = 0; i < movieImages.length; i++) {
                encMovieImages.push(aesEncryption(movieImages[i])); 
            }

            return res.status(200).json({
                result:encMovieImages,
                errorMessage:""
            });
        });
    }
}