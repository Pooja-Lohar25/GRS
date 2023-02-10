const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const dotenv = require('dotenv')
const ejs = require('ejs')

const {
    login,
    signup,
    dashboard,
    newcomplaint
} = require('./routes')

app.set('views',path.resolve(__dirname,'../assets','../assets'))
app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true})) //parsing form data to access it in routes
app.use(express.static(path.resolve(__dirname,'../assets')))

//creating session 
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24}, //24 hours
    resave: true,
    saveUninitialized: false 
}));

//routes
app.use('/login',login)
app.use('/signup',signup)
app.use('/dashboard',dashboard)
app.use('/newcomplaint',newcomplaint)


app.listen(4000,()=>{
    console.log("server listening on port 4000")
})


