var router = require('express').Router();
const {jwtVerify} = require("../../security/jwt_authorization");
const { 
    getCategories,
    getMoviesByCategoryId
 } = require('./category.controller');

router.get('/', jwtVerify, getCategories);
router.get('/get_movies_by_category_Id', jwtVerify, getMoviesByCategoryId);   //Requires in query params: categoryId

module.exports = router;