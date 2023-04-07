getHomePage = (req,res) => {
   if (req.isAuthenticated())
        res.render("index", {is_logged_in: true, username: req.user.username});
        
    else
        res.render("index", {is_logged_in: false});
};
module.exports=getHomePage