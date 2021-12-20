const pool = require('../../config/database');

module.exports = {

    addFavouriteOp: (userId, movieId, callBack) =>{
        pool.query(
            "INSERT INTO favourite(user_id,movie_id) VALUES (?,?)",
            [
                userId,
                movieId
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
    },

    deleteFavouriteOp: (userId, movieId, callBack) =>{
        pool.query(
            "DELETE FROM favourite WHERE user_id=? AND movie_id=?",
            [
                userId,
                movieId
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(!results){
                    return callBack("There is error in delete query");
                }

                return callBack(null);
            }
        );
    },

    getUserFavouritesOp: (userId, callBack) =>{
        pool.query(
            "SELECT distinct c.name AS category_name, m.id, m.name AS movie_name, m.description, m.rate, p.image_path FROM movie m JOIN category c ON c.id = m.category_id JOIN photo p ON m.id = p.movie_id JOIN favourite f ON m.id = f.movie_id WHERE p.poster = 1 AND p.banner = 0 AND f.user_id = ?",
            [
                userId,
            ],
            (error, favourites, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(!favourites){
                    return callBack("There is error in select query");
                }

                return callBack(null, favourites);
            }
        );
    },

    getFavouriteIdOp: (userId, movieId, callBack) =>{
        pool.query(
            "SELECT id "
            +"FROM favourite "
            +"WHERE user_id = ? AND movie_id = ?",
            [
                userId,
                movieId
            ],
            (error, favouriteId, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }

                return callBack(null, favouriteId.length == 0 ? 0 : favouriteId[0].id);
            }
        );
    }
}