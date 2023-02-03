//data manipulation operations to be written here
const bcrypt = require('bcrypt')
const saltrounds = 10
const {con}  = require('./dbconnect')
const path = require('path')

 login = async  (req,res)=>{
    
    qry = `SELECT password FROM students WHERE username = '${req.body.loginEmail}' ;`
    con.query(qry, (err, rows) => {
        if (err){
            //throw err
            res.send('something went wrong')
        }
        if(rows.length == 0)
        {
            res.status(401).sendFile(path.resolve(__dirname,'../assets','error.html'))
            // res.status(401)
            // res.redirect('/')
        } 
        else { 
            bcrypt.compare(req.body.loginPassword,rows[0].password,(err,result)=>{ 
                if(err) console.log(err)
                if(result)
                    res.status(200).sendFile(path.resolve(__dirname,'../assets','dashboard.html'))
                else {
                    res.status(401).sendFile(path.resolve(__dirname,'../assets','error.html'))
                    // res.status(401)
                    // res.redirect('/')
                }
            })
        }
     })
     
}

 signup = async (req)=>{
    const enroll = req.body.enrollmentOfStudent
    const name = req.body.nameOfStudent
    var branch = req.body.branchOfStudent
    const course  = req.body.courseOfStudent
    const sem = req.body.semesterOfStudent
    const username = req.body.emailOfStudent
    const pass =  await bcrypt.hash(req.body.password,saltrounds)
    const contact = req.body.contactOfStudent
    if(!branch) branch = ""
    console.log(enroll,branch,name,course,sem,username,pass,contact);
    qry = `INSERT INTO students VALUES('${enroll}','${name}','${branch}','${course}','${sem}','${username}','${pass}','${contact}');`
    sign = con.query(qry,(err,result)=>{
        if(err) return false
        return result
    })
    return sign
}

raiseComplaint = async (req,res)=>{
    //TODO:take user details from session variables
    
    const domain = req.body.domainOfComplaint
    const sub = req.body.subjectOfComplaint
    const desc = req.body.descriptionOfComplaint
    const issue = sub + ":" + desc
    const dept = req.body.issuedToDept
    qry = `
    INSERT INTO complaints(domid,issue,status,deptid) VALUES(
        '${domain}','${issue}','0','${dept}');
    `
    
    con.query(qry,(err,result)=>{
        if(err){
            // throw err
            res.status(500).send('something went wrong')
        }
        else{
            console.log('issue raised successfully')
            res.status(200).send('issue raised successfully')
        }
    })

   

}

module.exports = {
    login,
    signup,
    raiseComplaint
}

