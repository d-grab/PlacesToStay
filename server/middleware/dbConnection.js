const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_DBASE
});

connection.connect(err => {
    // If it fails, display an error
    if(err) {
        console.log(`Cannot connect to database: ${err}`);
        process.exit(1);
    } else {
        console.log(`Connected to Database: `); }});

    module.exports= connection;