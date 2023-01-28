const express = require('express')
const app = express()
const path = require('path')
const crud = require('../database/crud')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.resolve(__dirname,'../assets')) )
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../assets','index.html'))
//     console.log('done')
// })


 app.post('/log',async (req,res)=>{
    logged = await crud.login(req)
    if(logged)
        res.send(`${req.body.loginEmail} is logged in`)
    else
        res.send(`${req.body.loginEmail} is unauthorised`)
})

app.post('/signup',(req,res)=>{
    crud.signup(req)
    res.send(`${req.body.username} is now registered`)
})
app.listen(4000,()=>{
    console.log("server listening on port 4000")
})