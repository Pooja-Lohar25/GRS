const express = require('express')
const app = express()
const path = require('path')

// const {sequelize} = require('../database/dbconnect')
const controllers = require('../database/controllers')

app.use(express.json())
app.use(express.urlencoded({extended:true})) //parsing form data to access it in routes

app.use(express.static(path.resolve(__dirname,'../assets')) )
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../assets','index.html'))
//     console.log('done')
// })


 app.post('/login', async (req,res)=>{
    controllers.login(req,res)
 })

app.post('/signup',async (req,res)=>{
    result = await controllers.signup(req,res)
    if(result == true)
    {
        res.send('student saved')
    }
    else{
        res.send(result)
    }
})

app.post('/raiseComplaint',async (req,res)=>{
    controllers.raiseComplaint(req,res)
})

app.listen(4000,()=>{
    console.log("server listening on port 4000")
})
