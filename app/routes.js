const express = require('express')
const path = require('path')
const controllers = require('../database/controllers')
const {auth} = require('./auth')

const login = express.Router()
const signup = express.Router()
const dashboard = express.Router()
const newcomplaint = express.Router()

login.get('/',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'../assets','index.html'))
    res.render('index',{message: ''})
})

login.post('/',async (req,res)=>{
    result = await controllers.login(req)
    if(result == true)
    {
        // res.status(200).sendFile(path.resolve(__dirname,'../assets','dashboard.html'))
        res.render('dashboard')
    }
    else{
        // res.render('error',{code :'401',errordesc: 'Unauthorised access' ,message:'Kindly provide valid credentials'})
        res.render('index',{message: 'Kindly provide valid credentials'})
    }
})

signup.post('/',async (req,res)=>{
    result = await controllers.signup(req)
    if(result == true)
    {
        // res.status(200).sendFile(path.resolve(__dirname,'../assets','index.html'))
        res.render('index',{message: 'User created successfully'})
    }
    else{
        console.log(result)
        // res.render('error',{code :'500',errordesc: '' ,message:'Something Went Wrong'})
        res.render('index',{message: 'Something went wrong!! Please try again'})
    }
})

dashboard.get('/',auth,async (req,res)=>{
    // res.sendFile(path.resolve(__dirname,'../assets','dashboard.html'))
    res.render('dashboard')
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



module.exports = {
    login,
    signup,
    dashboard,
    newcomplaint
}