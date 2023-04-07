const session = require("express-session");
const con = require('../middleware/dbConnection');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({ } , con.promise());
require('dotenv').config();

module.exports = session({
    store:sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling:true,
    unset: 'destroy',
    proxy: true, 
    cookie: { 
      maxAge: 600000, // 600000 ms = 10 mins expiry time
      httpOnly: false // allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
    }});