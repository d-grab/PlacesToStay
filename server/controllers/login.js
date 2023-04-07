login = (req,res) => {
    
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage'), req: req });
}

module.exports= login;