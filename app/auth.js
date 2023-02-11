auth = async (req,res,next)=>{
    if(req.session.user == null)
    {
        res.redirect('/login')
    }
    else{
        next()
    }
}

module.exports = {
    auth
}
