# ![movietube_icon](https://github.com/AbdAlghaniAlbiek/MovieTube/blob/master/MovieTube/Assets/AppIcons/StoreLogo.scale-100.png) movietube_backend ![Twitter Follow](https://img.shields.io/twitter/follow/AbdAlbiek?style=social) ![GitHub](https://img.shields.io/github/license/AbdAlghaniAlbiek/SQLiteDBProject) ![node-current](https://img.shields.io/node/v/dotenv)

* This project is the backend that serve MovieTube UWP client application that contains on Restfull APIs and the required resources(movies, trailers and actors' images).
* you can see the UWP client app from [here.](https://github.com/AbdAlghaniAlbiek/MovieTube)

# Table of content
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Dependencies](#dependencies)
* [Architecture schreenshot](architecture-screenshot)
* [Versions](#versions)
* [Project status](project-status)

## Technologies Used
* Routing.
* Streaming videos to the client.
* Connecting to MySQL DB.
* Sending emails.
* High level security.

## Features
* Making routing system that help me to create Restfull APIs and make the work more organized.
* Streaming the stored video content to the client, thanks to express.static(..).
* Connection to MySQL databse that created using `PhpMyAdmin` and Initialize the connection to MySQL DBMS using XAMP control panel.
* Sending emails using `nodemailer` library to verify the identity of user when he makes an account.
* This project accomplich the highiest security level By using these Techniques:
 1. Encryption/Decryption data that sended/received between server and client using AES-128-cbc alghorithm.
 2. Verify the requests that are from signed account not from any user and I achieved this using JWT tech.
 3. To verify the token is sended from the right server, I decode token to have sercret keyword and check this sercret keyword if it's equal to the stored secret keyword in my UWP application or not.
 4. All secret key and configuration are implemented inside .env file.
 5. Making `JWT` more confident by using hash mac alghorithm and encrypting JWT's payload items.

## Architecture schreenshot
<p align="center">
 <img src="https://github.com/AbdAlghaniAlbiek/movietube_backend/blob/main/arch.jpg"> 
 </p>
 
 ## Dependencies
 1. bycrypt.
 2. body-parser.
 3. dotenv.
 4. express.
 5. jsonwebtoken.
 6. multer.
 7. mysql.
 8. nodemon.
 9. nodemailer
 
 ## Versions
 **[version 1.0.0]:** Contains all features that descriped above.
 
 ## Project status
 This project `no longer being worked on` but the contributions are still welcome.








