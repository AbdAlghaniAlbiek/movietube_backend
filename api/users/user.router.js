const multer = require('multer');
var router = require('express').Router();
const {jwtVerify} = require("../../security/jwt_authorization");
const {
    register,
    login,
    verify,
    addUpdateComment,
    addUpdateLike,
    addUpdateRating,
    getLike,
    getLikeRatingsComment
} = require('./user.controller');


// storage engine 
const storage = multer.diskStorage({
  destination: './public/upload/images/users',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
  });

  const upload = multer({
    storage: storage,
    limits: {
    fileSize: 1000000
    }
  });
  

router.post('/register', register);   //Requires in form-data :email, password, name
router.post('/verify', verify);  //Requires in form-data : verifyCode
router.post('/login', login);  //Requires in form-data: email, password
router.post('/add_update_comment', jwtVerify , addUpdateComment);  //Requires in query params: userId, movieId, userComment
router.post('/add_update_like', jwtVerify, addUpdateLike);  //Requires in query params: userId, movieId, liked
router.post('/add_update__rating', jwtVerify, addUpdateRating);   //Requires in query params: userId, movieId, userRatingEntertament, userRatingResolution, userRatingPerformActor
router.get('/get_like', jwtVerify, getLike);  //Requires in query params: userId, movieId,
router.get('/get_like_ratings_comment', jwtVerify, getLikeRatingsComment);  //Requires in query params: userId, movieId,

module.exports = router;