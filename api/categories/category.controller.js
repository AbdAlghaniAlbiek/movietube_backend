const { jwtVerify } = require('../../security/jwt_authorization');
const {
     getCategoriesOp,
     getMoviesByCategoryIdOp
} = require('./category.service');
const { aesEncryption } = require('../../security/aes_algorithm');

module.exports = {

    getCategories: (req, res) =>{

        // const token = req.get('authorization');
        // let authError = jwtVerify(token);
        // if(authError){
        //     console.log(authError);
        //     return res.status(200).json({
        //         result:null,
        //         errorMessage:aesEncryption(authError)});
        // }

        getCategoriesOp((error, categories) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:aesEncryption(error)});
            }

            var encCategories = new Array();
            for (let i = 0; i < categories.length; i++) {
                encCategories.push({
                    id:categories[i].id,
                    name:aesEncryption(categories[i].name),
                    image_path:aesEncryption(categories[i].image_path)
                }); 
            }

            return res.status(200).json({
                result:encCategories,
                errorMessage:""
            });
        });
    },

    getMoviesByCategoryId: (req, res) =>{

        // const token = req.get('authorization');
        // let authError = jwtVerify(token);
        // if(authError){
        //     console.log(authError);
        //     return res.status(200).json({
        //         result:null,
        //         errorMessage:aesEncryption(authError)});
        // }
        
        if(!req.query.categoryId){
            var error = "There is some missing parameters"
            console.log(error);
            return res.status(200).json({
                result:null,
                errorMessage:aesEncryption(error)});
        }

        getMoviesByCategoryIdOp(req.query.categoryId, (error, movies) =>{
            if(error){
                console.log(error);
                return res.status(200).json({
                    result:null,
                    errorMessage:error});
            }

            var encMovies = new Array();
            for (let i = 0; i < movies.length; i++) {
                encMovies.push({
                    id:movies[i].id,
                    category_name:aesEncryption(movies[i].category_name),
                    movie_name:aesEncryption(movies[i].movie_name),
                    description:aesEncryption(movies[i].description),
                    rate:aesEncryption(movies[i].rate.toString()),
                    image_path:aesEncryption(movies[i].image_path)
                });
                
            }

            return res.status(200).json({
                result:encMovies,
                errorMessage:""
            });
        });
    }
}
