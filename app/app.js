const express = require('express')
const app = express()
const path = require('path')
const crud = require('../database/crud')
app.use(express.json())
app.use(express.urlencoded({extended:true})) //parsing form data to access it in routes

app.use(express.static(path.resolve(__dirname,'../assets')) )
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../assets','index.html'))
//     console.log('done')
// })


 app.post('/login', async (req,res)=>{
    crud.login(req,res)
 })

app.post('/signup',async (req,res)=>{
    crud.signup(req,res)
})

app.post('/raiseComplaint',async (req,res)=>{
    crud.raiseComplaint(req,res)
})

app.listen(4000,()=>{
    console.log("server listening on port 4000")
})
