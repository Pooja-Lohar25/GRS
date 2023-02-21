const express = require('express')
const path = require('path')
const controllers = require('../database/controllers')
const {auth} = require('./auth')

//creating routers
const index = express.Router()
const admin  = express.Router()
const login = express.Router()
const signup = express.Router()
const dashboard = express.Router()
const newcomplaint = express.Router()
const upvotes = express.Router()
const profile = express.Router()

var allcomplaint = []


//setting up routers with static files 
index.use(express.static(path.resolve(__dirname,'../assets')))
admin.use(express.static(path.resolve(__dirname,'../assets')))
login.use(express.static(path.resolve(__dirname,'../assets')))
signup.use(express.static(path.resolve(__dirname,'../assets')))
dashboard.use(express.static(path.resolve(__dirname,'../assets')))
newcomplaint.use(express.static(path.resolve(__dirname,'../assets')))
upvotes.use(express.static(path.resolve(__dirname,'../assets')))
profile.use(express.static(path.resolve(__dirname,'../assets')))


//defining routes
index.get('/',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'../assets','index.html'))
    res.render('index',{message: ''})
})

admin.get('/',(req,res)=>{
    res.render('adminSignup',{message: 'Enter your Details'})

})
admin.post('/',async (req,res)=>{
    result = await controllers.adminReg(req,"student")
    if(result == true)
    {
        // res.status(200).sendFile(path.resolve(__dirname,'../assets','index.html'))
        res.render('adminSignup',{message: 'User created successfully'})
    }
    else{
        console.log(result)
        // res.render('error',{code :'500',errordesc: '' ,message:'Something Went Wrong'})
        res.render('adminSignup',{message: 'Something went wrong!! Please try again'})
    }
})

login.get('/student',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'../assets','index.html'))
    res.render('login',{message: ''})
})

login.get('/faculty',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'../assets','index.html'))
    res.render('facultyLogin',{message: ''})
})

login.get('/admin',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'../assets','index.html'))
    res.render('adminLogin',{message: ''})
})

login.post('/student',async (req,res)=>{
    result = await controllers.login(req,"student")
    if(result == true)
    {
        allcomplaint = await controllers.getAllComplaints()
        if(allcomplaint == false)
        {
            allcomplaint = []
            res.render('dashboard',{message: 'Something went wrong', allComplaints: allcomplaint})
        }
        else if(allcomplaint == [])
        {
            res.render('dashboard',{message: 'No complaints found', allComplaints: allcomplaint})
        }
        else
        {
            res.render('dashboard',{message: '', allComplaints: allcomplaint})
        }
    }
    else{
        // res.render('error',{code :'401',errordesc: 'Unauthorised access' ,message:'Kindly provide valid credentials'})
        res.render('login',{message: 'Kindly provide valid credentials'})
    }
})

login.post('/faculty',async (req,res)=>{
    result = await controllers.login(req,"faculty")
    if(result == true)
    {
        // res.status(200).sendFile(path.resolve(__dirname,'../assets','dashboard.html'))
        res.render('dashboard',{message: '',complaint:''})
    }
    else{
        // res.render('error',{code :'401',errordesc: 'Unauthorised access' ,message:'Kindly provide valid credentials'})
        res.render('facultyLogin',{message: 'Kindly provide valid credentials'})
    }
})

login.post('/admin',async (req,res)=>{
    result = await controllers.login(req,"admin")
    if(result == true)
    {
        
        res.render('dashboard',{message: '',allComplaints:''})
    }
    else{
        // res.render('error',{code :'401',errordesc: 'Unauthorised access' ,message:'Kindly provide valid credentials'})
        res.render('login',{message: 'Kindly provide valid credentials'})
    }
})

signup.post('/student',async (req,res)=>{
    result = await controllers.signup(req,"student")
    if(result == true)
    {
        // res.status(200).sendFile(path.resolve(__dirname,'../assets','index.html'))
        res.render('login',{message: 'User created successfully'})
    }
    else{
        console.log(result)
        // res.render('error',{code :'500',errordesc: '' ,message:'Something Went Wrong'})
        res.render('login',{message: 'Something went wrong!! Please try again'})
    }
})

signup.post('/faculty',async (req,res)=>{
    result = await controllers.signup(req,"faculty")
    if(result == true)
    {
        // res.status(200).sendFile(path.resolve(__dirname,'../assets','index.html'))
        res.render('facultyLogin',{message: 'User created successfully'})
    }
    else{
        console.log(result)
        // res.render('error',{code :'500',errordesc: '' ,message:'Something Went Wrong'})
        res.render('facultyLogin',{message: 'Something went wrong!! Please try again'})
    }
})

signup.post('/admin',async (req,res)=>{
    result = await controllers.signup(req,"admin")
    if(result == true)
    {
        // res.status(200).sendFile(path.resolve(__dirname,'../assets','index.html'))
        res.render('login',{message: 'User created successfully'})
    }
    else{
        console.log(result)
        // res.render('error',{code :'500',errordesc: '' ,message:'Something Went Wrong'})
        res.render('login',{message: 'Something went wrong!! Please try again'})
    }
})

dashboard.get('/',auth,async (req,res)=>{
    if(allcomplaint == false)
        {
            allcomplaint = []
            res.render('dashboard',{message: 'Something went wrong', allComplaints: allcomplaint})
        }
        else if(allcomplaint == [])
        {
            res.render('dashboard',{message: 'No complaints found', allComplaints: allcomplaint})
        }
        else
        {
            res.render('dashboard',{message: '', allComplaints: allcomplaint})
        }
})

dashboard.get('/search',auth,async (req,res)=>{
    

})

newcomplaint.get('/',auth,async (req,res)=>{
    // res.sendFile(path.resolve(__dirname,'../assets','newcomplaint.html'))
    res.render('newcomplaint' ,{message: ''})
})

newcomplaint.post('/',auth,async (req,res)=>{
    
    result = await controllers.raiseComplaint(req).then((result)=>{return result}) //returns a promise
    console.log(result)
    if(result == true)
    {
        // res.send(`<h1>Issue raised successfully</h1>`)
        res.render('newcomplaint',{message: 'Issue raised successfully'})
    }
    else{
        console.log(result)
        // res.render('error',{code :'500',errordesc: '' ,message: result})
        res.render('newcomplaint',{message: 'Something went wrong!! Please try again'})
    }
})

upvotes.get('/:cid',auth,async (req,res)=>{
    await controllers.upvotes(req,req.params.id).then((result)=>{
        if(result == true)
        {
            res.render('dashboard',{message: 'Upvote successful',complaint:''})
        }
        else{
            res.render('dashboard',{message : result,complaint:''})
        }
    })
})

profile.get('/',auth,async (req,res)=>{
    if(req.session.user.role == "student"){
    res.render('studentProfile',{
        role : req.session.user.role,
        name: req.session.user.name , 
        email: req.session.user.username , 
        phone: req.session.user.phone , 
        rollno: req.session.user.enroll_no , 
        branch: req.session.user.branch , 
        course : req.session.user.course ,
        sem: req.session.user.semester})
    }
    else if(req.session.user.role == "faculty"){
        res.render('FacultyProf',{
            role : req.session.user.role,
            name: req.session.user.name , 
            username: req.session.user.username , 
            phone: req.session.user.phone ,  
            dept: req.session.user.dept ,
            designation : req.session.user.designation
            })
    }
})

profile.get('/faculty',auth,async (req,res)=>{
    res.render('faculties',{
        name: req.session.user.name , 
        username: req.session.user.username , 
        phone: req.session.user.phone ,  
        dept: req.session.user.dept ,
        designation : req.session.user.designation
        })
})


module.exports = {
    index,
    admin,
    login,
    signup,
    dashboard,
    newcomplaint,
    upvotes,
    profile
}