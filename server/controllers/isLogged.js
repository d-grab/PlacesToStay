function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        
        res.json({msg: "Booking is only available for logged in users . \nPlease log in !"});
    }
}
 module.exports= checkAuthentication