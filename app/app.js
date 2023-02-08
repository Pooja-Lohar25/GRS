const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const dotenv = require('dotenv')

// const {sequelize} = require('../database/dbconnect')

const controllers = require('../database/controllers')
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(express.json())
app.use(express.urlencoded({extended:true})) //parsing form data to access it in routes

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../assets','index.html'))
    console.log(req.sessionID)
})
app.use(express.static(path.resolve(__dirname,'../assets')) )


app.post('/login', async (req,res)=>{
    
    result = await controllers.login(req)
    if(result == true)
    {
        res.status(200).sendFile(path.resolve(__dirname,'../assets','dashboard.html'))
    }
    else{
        res.status(401).sendFile(path.resolve(__dirname,'../assets','error.html'))
    }
})

app.post('/signup',async (req,res)=>{
    result = await controllers.signup(req)
    if(result == true)
    {
        res.status(200).sendFile(path.resolve(__dirname,'../assets','index.html'))
    }
    else{
        console.log(result)
        res.send("something went wrong")
    }
})

app.post('/raiseComplaint',async (req,res)=>{
    result = await controllers.raiseComplaint(req)
    if(result == true)
    {
        res.send('issue raised successfully')
    }
    else{
        res.send("something went wrong")
    }
})

app.listen(4000,()=>{
    console.log("server listening on port 4000")
})
