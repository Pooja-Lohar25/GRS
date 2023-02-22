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
const comp = express.Router()

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
comp.use(express.static(path.resolve(__dirname,'../assets')))


//defining routes
index.get('/',(req,res)=>{
    //destroy session
    req.session.destroy()
    res.render('index',{message: ''})
})


/**********************************/
/**student routes */
/**********************************/

login.get('/student',(req,res)=>{
    res.render('login',{message: ''})
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
        res.render('login',{message: 'Kindly provide valid credentials'})
    }
})

signup.post('/student',async (req,res)=>{
    result = await controllers.signup(req,"student")
    if(result == true)
    {
        res.render('login',{message: 'User created successfully'})
    }
    else{
        console.log(result)
        res.render('login',{message: 'Something went wrong!! Please try again'})
    }
})

dashboard.get('/',auth,async (req,res)=>{
    allcomplaint = await controllers.getAllComplaints()
    if(req.session.user.role == "student"){

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
                res.render('dashboard',{message: '' , allComplaints: allcomplaint})
            }
    }
    else if(req.session.user.role == "faculty") {
        res.render('facultydashboard',{message: '',allComplaints:allcomplaint})
        
    }
})

dashboard.get('/search',auth,async (req,res)=>{
    const srchquery = req.query.search
    var srchresult = []
    if(allcomplaint){
        srchresult = allcomplaint.filter((complaint)=>{
            return complaint.issue.toLowerCase().includes(srchquery.toLowerCase()) || complaint.status.toLowerCase().includes(srchquery.toLowerCase()) || complaint.description.toLowerCase().includes(srchquery.toLowerCase())
        })
        if(srchresult == []){
            res.render('dashboard',{message: 'No complaints found', allComplaints: srchresult})
        }
        else
            res.render('dashboard',{message: '', allComplaints: srchresult})
    }
    else res.render('dashboard',{message: 'No complaints', allComplaints: allcomplaint})

})


newcomplaint.get('/',auth,async (req,res)=>{
    res.render('newcomplaint' ,{message: ''})
})

newcomplaint.post('/',auth,async (req,res)=>{
    
    result = await controllers.raiseComplaint(req).then((result)=>{return result}) //returns a promise
    console.log(result)
    if(result == true)
    {
        res.render('newcomplaint',{message: 'Issue raised successfully'})
    }
    else{
        console.log(result)
        res.render('newcomplaint',{message: 'Something went wrong!! Please try again'})
    }
})

upvotes.get('/:cid',auth,async (req,res)=>{
    await controllers.upvotes(req,req.params.id).then((result)=>{
        if(result == true)
        {
            res.render('dashboard',{message : 'Upvote added successfully' ,allComplaints:allcomplaint})
            
        }
        else{
            res.render('dashboard',{message : result ,allComplaints:allcomplaint})
        }
    })
})


/**********************************/
/**faculty routes */
/**********************************/
login.get('/faculty',(req,res)=>{
    res.render('facultyLogin',{message: ''})
})

login.post('/faculty',async (req,res)=>{
    result = await controllers.login(req,"faculty")
    if(result == true)
    {
        allcomplaint = await controllers.getAllComplaints()
        res.render('facultydashboard',{message: '',allComplaints:allcomplaint})
    }
    else{
        res.render('facultyLogin',{message: 'Kindly provide valid credentials'})
    }
})

signup.post('/faculty',async (req,res)=>{
    result = await controllers.signup(req,"faculty")
    if(result == true)
    {
        res.render('facultyLogin',{message: 'User created successfully'})
    }
    else{
        console.log(result)
        res.render('facultyLogin',{message: 'Something went wrong!! Please try again'})
    }
})

comp.get('/:cid',auth,async (req,res)=>{
    await controllers.getComplaint(req,req.params.id).then((result)=>{
        if(result == false)
        {
            res.render('facultydashboard',{message : 'Something went wrong' ,allComplaints:allcomplaint})
            
        }
        else{
            res.render('complaint-form',{message : '' ,complaint:result})
        }
    })
})

comp.post('/:cid',auth,async (req,res)=>{
    await controllers.setstatus(req,req.params.id).then((result)=>{
        if(result == true)
        {
            res.render('facultydashboard',{message : 'Status Updated' ,allComplaints:allcomplaint})
            
        }
        else{
            res.render('facultydashboard',{message : result ,allComplaints:allcomplaint})
        }
    })
})


/******************************** */
/**admin routes */
/******************************** */

admin.get('/',(req,res)=>{
    res.render('adminSignup',{message: 'Enter your Details'})

})
admin.post('/',async (req,res)=>{
    result = await controllers.adminReg(req,"student")
    if(result == true)
    {
        res.render('adminSignup',{message: 'User created successfully'})
    }
    else{
        console.log(result)
        res.render('adminSignup',{message: 'Something went wrong!! Please try again'})
    }
})

login.get('/admin',(req,res)=>{
    res.render('adminLogin',{message: ''})
})


login.post('/admin',async (req,res)=>{
    result = await controllers.login(req,"admin")
    if(result == true)
    {
        res.send('admin dashboard')
        // res.render('admindashboard',{message: '',allComplaints:''})
    }
    else{
        res.render('login',{message: 'Kindly provide valid credentials'})
    }
})

signup.post('/admin',async (req,res)=>{
    result = await controllers.signup(req,"admin")
    if(result == true)
    {
        res.render('login',{message: 'User created successfully'})
    }
    else{
        console.log(result)
        res.render('login',{message: 'Something went wrong!! Please try again'})
    }
})



/*************************** */
/**common routes */
/*************************** */

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
    var faculties = await controllers.getFaculties()
    res.render('faculties',{ faculties: faculties })
})

dashboard.get('/search/dept',auth,async (req,res)=>{
    //TODO:search complaint by department
    res.send('search by department')
})









module.exports = {
    index,
    admin,
    login,
    signup,
    dashboard,
    newcomplaint,
    upvotes,
    profile,
    comp
}