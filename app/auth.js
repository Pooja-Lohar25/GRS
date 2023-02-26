auth = async (req,res,next)=>{
    if(req.session.user == null)
    {
        res.redirect('/')
    }
    else{
        next()
    }
}
authStu = async (req,res,next)=>{
    if(req.session.user.role == 'student')
    {
        next()
    }
    else{
        res.redirect('/')
    }
}
authFac = async (req,res,next)=>{
    if(req.session.user.role == 'faculty')
    {
        next()
    }
    else{
        res.redirect('/')
    }
}
authAdmin = async (req,res,next)=>{
    if(req.session.user.role == 'admin')
    {
        next()
    }
    else{
        res.redirect('/')
    }
}
module.exports = {
    auth
}
