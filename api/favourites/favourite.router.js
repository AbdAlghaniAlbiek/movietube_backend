var router = require('express').Router();
const {jwtVerify} = require("../../security/jwt_authorization");
const { 
    addFavourite,
    deleteFavourite,
    getUserFavourites,
    getFavouriteId
} = require('./favourite.controller');

router.post('/', jwtVerify, addFavourite);     //Requires in query params: userId, movieId
router.delete('/', jwtVerify, deleteFavourite);   //Requires in query params: userId, movieId
router.get('/', jwtVerify, getUserFavourites);   //Requires in query params: userId
router.get('/get_favourite_Id', jwtVerify, getFavouriteId);   //Requires in query params: userId, movieId

module.exports = router;