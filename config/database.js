require('dotenv').config();
const {createPool} = require('mysql');
require('dotenv').config()

const pool = createPool({
    
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.MYSQL_DB_NAME,
    connectionLimit : 10
});

module.exports = pool;