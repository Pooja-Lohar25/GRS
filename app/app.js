const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.resolve(__dirname,'../assets')) )
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../assets','index.html'))
//     console.log('done')
// })

app.listen(4000,()=>{
    console.log("server listening on port 4000")
})