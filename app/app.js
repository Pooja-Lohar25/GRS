const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.resolve(__dirname,'../assets')) )
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../assets','index.html'))
//     console.log('done')
// })


app.post('/log',(req,res)=>{
    login(req)
    res.send(`${req.body.username} is logged in`)
})

app.post('/signup',(req,res)=>{
    signup(req)
    res.send(`${req.body.username} is now registered`)
})
app.listen(4000,()=>{
    console.log("server listening on port 4000")
})