const pool = require('../../config/database');

module.exports = {

    getCategoriesOp: (callBack) =>{
        pool.query(
            "SELECT c.id, c.name, c.image_path FROM category c ORDER BY c.id",
            [],
            (error, categories, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(categories.length == 0){
                    return callBack("There is error in select query");
                }

                return callBack(null, categories);
            }
        );
    },

    getMoviesByCategoryIdOp: (categId, callBack) =>{
        pool.query(
            "SELECT c.name AS category_name, m.id, m.name AS movie_name, m.description, m.rate, p.image_path FROM movie m JOIN category c ON c.id = m.category_id JOIN photo p ON m.id = p.movie_id WHERE p.poster = 1 AND p.banner = 0 AND c.id=?",
            [
                categId
            ],
            (error, movies, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(movies.length == 0){
                    return callBack("There is error in select query");
                }

                return callBack(null, movies);
            }
        );
    },
}

