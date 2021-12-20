const pool = require('../../config/database');

module.exports = {

    getBestMoviesOp: (callBack) =>{
        pool.query(
            "SELECT c.name AS category_name, m.id, m.name AS movie_name, m.description, m.rate, p.image_path FROM movie m  JOIN category c ON c.id = m.category_id JOIN photo p  ON m.id = p.movie_id WHERE p.poster = 0 AND p.banner = 1 AND m.id <6 ORDER BY m.rate DESC  LIMIT 5",
            [],
            (error, bestMovies, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(!bestMovies){
                    return callBack("There is error in select query");
                }

                return callBack(null, bestMovies);
            }
        );
    },

    getMovieActorsOp: (movieId, callBack) =>{
        pool.query(
            "SELECT a.id, a.name, a.image_path FROM movie m JOIN movie_actor ma ON m.id = ma.movie_id JOIN actor a  ON a.id = ma.actor_id WHERE m.id = ?",
            [
                movieId
            ],
            (error, actors, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(!actors){
                    return callBack( "There is error in select query");
                }

                return callBack(null, actors);
            }
        );
    },

    getMovieCommentsOp: (movieId, callBack) =>{
        pool.query(
            "SELECT u.id, u.name, u.image_path, r.comment FROM user u  JOIN rating r ON u.id = r.user_id JOIN movie m  ON m.id = r.movie_id WHERE m.id = ?",
            [
                movieId
            ],
            (error, comments, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(!comments){
                    return callBack("There is error in select query");
                }

                return callBack(null, comments);
            }
        );
    },

    getMovieCountCommentsLikesRatingsOp: (movieId, callBack) =>{
        pool.query(
            "SELECT m.id, table_comments.count_comments, table_like.count_like, table_dislike.count_dislike, table_ratings.count_ratings, AVG(r.rating_entertament) AS avg_rating_entertament, AVG(r.rating_resolution) AS rating_resolution, AVG(r.rating_perform_actors) AS rating_perform_actors FROM movie m  JOIN rating r  ON m.id = r.movie_id JOIN ( SELECT  m.id, COUNT(r.liked) AS count_like FROM movie m  JOIN rating r  ON m.id = r.movie_id  WHERE r.liked = 1 AND m.id = ? ) AS table_like ON table_like.id = m.id JOIN ( SELECT  m.id, COUNT(r.liked) AS count_dislike FROM movie m  JOIN rating r  ON m.id = r.movie_id  WHERE r.liked = 2 AND m.id = ? ) AS table_dislike ON table_dislike.id = m.id JOIN ( SELECT  m.id, COUNT(r.total_rating) AS count_ratings FROM movie m  JOIN rating r  ON m.id = r.movie_id  WHERE r.total_rating <> 0 AND m.id = ? ) AS table_ratings ON table_ratings.id = m.id JOIN ( SELECT  m.id, COUNT(r.comment) AS count_comments FROM movie m  JOIN rating r  ON m.id = r.movie_id  WHERE r.comment IS NOT NULL AND m.id = ? ) AS table_comments ON table_comments.id = m.id WHERE m.id = ? GROUP BY m.id",
            [
                movieId,
                movieId,
                movieId,
                movieId,
                movieId
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(!results){
                    return callBack("There is error in select query");
                }

                return callBack(null, results[0]);
            }
        );
    },

    getMovieDescriptionOp: (movieId, callBack) =>{
        pool.query(
            "SELECT DISTINCT m.id, m.name, m.description, m.rate, m.movie_path, m.trailer_path, m.release_date, banner_image.banner, poster_image.poster FROM movie m JOIN photo p ON m.id = p.movie_id JOIN ( SELECT m.id, p.image_path AS banner FROM movie m JOIN photo p ON m.id = p.movie_id WHERE p.banner = 1 AND p.poster = 0 ) AS banner_image ON banner_image.id = m.id JOIN ( SELECT m.id, p.image_path AS poster FROM movie m JOIN photo p ON m.id = p.movie_id WHERE p.banner = 0 AND p.poster = 1 ) AS poster_image ON poster_image.id = m.id WHERE m.id = ?",
            [
                movieId
            ],
            (error, description, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(description.length == 0){
                    return callBack("There is error in select query");
                }

                console.log(description[0]);
                return callBack(null, description[0]);
            }
        );
    },

    getMovieImagesOp: (movieId, callBack) =>{
        pool.query(
            "SELECT p.image_path FROM movie m JOIN photo p ON m.id = p.movie_id WHERE p.banner = 0 AND p.poster = 0 AND m.id = ?",
            [
                movieId
            ],
            (error, movieImages, fields) =>{
                if(error){
                    return callBack("Error in mysql settings or the request on your query is time out");
                }
                else if(movieImages.length == 0){
                    return callBack("There is error in select query");
                }

                var movieImagesModified = new Array();

                for (let i = 0; i < movieImages.length; i++) {
                    movieImagesModified.push(movieImages[i].image_path);
                }

                return callBack(null, movieImagesModified);
            }
        );
    },
}