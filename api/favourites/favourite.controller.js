const { jwtVerify } = require('../../security/jwt_authorization');
const {  
    addFavouriteOp,
    deleteFavouriteOp,
    getUserFavouritesOp,
    getFavouriteIdOp
} = require('../../api/favourites/favourite.service');
const { aesEncryption } = require('../../security/aes_algorithm');
 
module.exports = {

    addFavourite: (req, res) =>{

        if(!req.query.userId || !req.query.movieId){
            var error = "Some parameters not found";
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

        addFavouriteOp(req.query.userId, req.query.movieId, (error) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            return res.status(200).json({
                result:aesEncryption("Added Favourite"),
                errorMessage:""});
        });
    },

    deleteFavourite: (req, res) =>{

        if(!req.query.userId || !req.query.movieId){
            var error = "Some parameters not found";
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

        deleteFavouriteOp(req.query.userId, req.query.movieId, (error) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            return res.status(200).json({
                result:aesEncryption("Deleted Favourite"),
                errorMessage:"" });
        });
    },

    getUserFavourites: (req, res) =>{

        if(!req.query.userId){
            var error = "Some parameters not found";
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
        //         errorMessage:authError});
        // }

        getUserFavouritesOp(req.query.userId, (error, favourites) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            var encFavMovies = new Array();
            for (let i = 0; i < favourites.length; i++) {
                encFavMovies.push({
                    id: favourites[i].id,
                    category_name: aesEncryption(favourites[i].category_name),
                    movie_name:aesEncryption(favourites[i].movie_name),
                    description:aesEncryption(favourites[i].description),
                    rate:aesEncryption(favourites[i].rate.toString()),
                    image_path:aesEncryption(favourites[i].image_path),
                }); 
            }

            return res.status(200).json({
                result:encFavMovies,
                errorMessage:""
            });
        });
    },

    getFavouriteId: (req, res) =>{
        
        if(!req.query.userId || !req.query.movieId){
            var error = "Some parameters not found";
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

        getFavouriteIdOp(req.query.userId, req.query.movieId, (error, favouriteId) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            return res.status(200).json(
                {
                    result: favouriteId == 0 ? aesEncryption((0).toString()) : aesEncryption(favouriteId.toString()), 
                    errorMessage:""
                });
        });
    },
}