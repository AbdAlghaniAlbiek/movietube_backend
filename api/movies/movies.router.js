var router = require('express').Router();
const {jwtVerify} = require("../../security/jwt_authorization");
const {
    getBestMovies,
    getMovieActors,
    getMovieComments,
    getMovieCountCommentsLikesRatings,
    getMovieDescription,
    getMovieImages
} = require('./movies.controller');

router.get('/get_best_movies', jwtVerify, getBestMovies);
router.get('/get_movie_actors', jwtVerify, getMovieActors);  //Requires in query params : movieId
router.get('/get_movie_comments', jwtVerify, getMovieComments);  //Requires in query params : movieId
router.get('/get_movie_count_comments_likes_ratings', jwtVerify, getMovieCountCommentsLikesRatings);  //Requires in query params : movieId
router.get('/get_movie_description', jwtVerify, getMovieDescription);  //Requires in query params : movieId
router.get('/get_movie_images', jwtVerify , getMovieImages);   //Requires in query params : movieId

module.exports = router;
