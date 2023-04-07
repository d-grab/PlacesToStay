logout=(req, res) => {
    
    req.session.destroy(() => {
        req.logout(() =>
        res.redirect('/'));
    })}

module.exports =  logout 