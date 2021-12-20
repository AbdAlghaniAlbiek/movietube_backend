require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
var multer = require('multer');
const bodyParser = require('body-parser');

//Initializing 
const app = express();
var uploadMulter = multer();
app.set('port', process.env.APP_PORT || 5000);

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// for parsing multipart/form-data
app.use(uploadMulter.array()); 
app.use('/public/loading/videos/movies', express.static(path.join(__dirname, 'public', 'loading','videos','movies')));
app.use('/public/loading/videos/trailers', express.static(path.join(__dirname, 'public','loading','videos','trailers')));
app.use('/public/loading/images/banners', express.static(path.join(__dirname, 'public','loading','images', 'banners')));
app.use('/public/loading/images/posters', express.static(path.join(__dirname, 'public','loading','images', 'posters')));
app.use('/public/loading/images/actors', express.static(path.join(__dirname, 'public','loading','images', 'actors')));
app.use('/public/loading/images/movies_photos', express.static(path.join(__dirname,'public', 'loading','images', 'movies_photos')));
app.use('/public/upload/images/users', express.static(path.join(__dirname, 'public','upload','images', 'users')));


//Load routers and implement them inside app
const usersRouter = require('./api/users/user.router');
const favouritesRouter = require('./api/favourites/favourite.router');
const categoriesRouter = require('./api/categories/category.router');
const moviesRouter = require('./api/movies/movies.router');

app.use('/api/users', usersRouter);
app.use('/api/favourites', favouritesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/movies', moviesRouter);

//Handling errors from multer if there was
function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
      res.json({
          errorMessage: err.message
      });
  }
}

app.use(errHandler);

//Make the server and make it listen from specific port
var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('server listening on port ' + app.get('port'))
});