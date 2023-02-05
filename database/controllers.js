//data manipulation operations to be written here
const bcrypt = require('bcrypt')
const saltrounds = 10
const {con}  = require('./dbconnect')
const path = require('path')
const {
    depts,
    emp,
    admins,
    students,
    compltDom,
    complaints,
    studentComplaints
} = require('./models')


 login = async  (req,res)=>{
    
    // qry = `SELECT password FROM students WHERE username = '${req.body.loginEmail}' ;`


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

 signup = async (req,res)=>{
    // var branch = req.body.branchOfStudent
    // if(!req.body.branchOfStudent) branch = ''
    const student = {
        enroll_no: req.body.enrollmentOfStudent,
        name: req.body.nameOfStudent,
        branch: req.body.branchOfStudent,
        course: req.body.courseOfStudent,
        semester: req.body.semesterOfStudent,
        username: req.body.emailOfStudent,
        password: await bcrypt.hash(req.body.password,saltrounds),
        phone: req.body.contactOfStudent
    }
    const st = students.build(student)
    return st.save().then(()=>{
        console.log('student saved')
        return true
    }).catch((err)=>{
        return err
    }
    )


    
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

