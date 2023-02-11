const express = require('express')
const path = require('path')
const controllers = require('../database/controllers')
const {auth} = require('./auth')

const login = express.Router()
const signup = express.Router()
const dashboard = express.Router()
const newcomplaint = express.Router()

login.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../assets','index.html'))
})

login.post('/',async (req,res)=>{
    result = await controllers.login(req)
    if(result == true)
    {
        res.status(200).sendFile(path.resolve(__dirname,'../assets','dashboard.html'))
    }
    else{
        res.render('error',{code :'401',errordesc: 'Unauthorised access' ,message:'Kindly provide valid credentials'})
    }
})

signup.post('/',async (req,res)=>{
    result = await controllers.signup(req)
    if(result == true)
    {
        res.status(200).sendFile(path.resolve(__dirname,'../assets','index.html'))
    }
    else{
        console.log(result)
        res.render('error',{code :'500',errordesc: '' ,message:'Something Went Wrong'})
    }
})

dashboard.get('/',auth,async (req,res)=>{
    res.sendFile(path.resolve(__dirname,'../assets','dashboard.html'))
})

newcomplaint.get('/',auth,async (req,res)=>{
    res.sendFile(path.resolve(__dirname,'../assets','newcomplaint.html'))
})

newcomplaint.post('/',auth,async (req,res)=>{
    
    result = await controllers.raiseComplaint(req).then((result)=>{return result}) //returns a promise
    console.log(result)
    if(result == true)
    {
        res.send(`<h1>Issue raised successfully</h1>`)
    }
    else{
        console.log(result)
        res.render('error',{code :'500',errordesc: '' ,message: result})
    }
})



module.exports = {
    login,
    signup,
    dashboard,
    newcomplaint
}