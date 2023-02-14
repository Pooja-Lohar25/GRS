auth = async (req,res,next)=>{
    if(req.session.user == null)
    {
        res.redirect('/')
    }
    else{
        next()
    }
}

module.exports = {
    auth
}
