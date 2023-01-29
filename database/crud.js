//data manipulation operations to be written here
const bcrypt = require('bcrypt')
const saltrounds = 10
const {con}  = require('./dbconnect')

 login = (req)=>{
    
    qry = `SELECT username FROM students WHERE username = '${req.body.loginEmail}' and password = '${req.body.loginPassword}';`
    logged = con.query(qry, (err, res) => {
         if (err)
            //throw err
            console.log("something went wrong")
         if (res[0].username)
             return true
         else
             return false
     })
     return logged
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

module.exports = {
    login,
    signup
}