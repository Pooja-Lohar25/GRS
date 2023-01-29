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


 app.post('/log', async (req,res)=>{
    crud.login(req,res)
 })

app.post('/signup',async (req,res)=>{
    result = await crud.signup(req)
    console.log(result)
    if(result) 
    res.send('user is registered')
    else 
    res.send('sorry something went wrong')
})
app.listen(4000,()=>{
    console.log("server listening on port 4000")
})