const passport = require("./passport");

let login = passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true, // allow flash messages
    
});

module.exports = {login }
