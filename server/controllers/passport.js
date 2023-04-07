var LocalStrategy   = require('passport-local')
const connection = require('../middleware/dbConnection');
const passport = require('passport');

passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
    passport.use(
        'local-login',
        new LocalStrategy({
            
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function authuser(req, username, password, done) { // callback with login and password from form
            
            connection.query("SELECT * FROM acc_users WHERE username = ? and password=?",[username, password], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Password or Login are incorrect ')); // req.flash is the way to set flashdata using connect-flash
                }
                else
                return done(null, rows[0]);
            });
        })
    );
module.exports = passport