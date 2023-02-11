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
const { upvotes } = require('../app/routes')


// openlogin = (req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../assets','index.html'))
// }


 login = async (req)=>{
    
    const stu = await students.findOne({
        where:{
            username:req.body.loginEmail
        }
    })
    if(stu == null)
    {
        return false
    }
    else{
        const result = await bcrypt.compare(req.body.loginPassword,stu.password)
        if(result == true)
        {
            req.session.user = {
                name: stu.name,
                username: stu.username,
                enroll_no:stu.enroll_no
            }
            return true
        }
    }
    
     
}

 signup = async (req)=>{
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





raiseComplaint = async (req)=>{
    
       //creating new complaint entry
       const complaint = {
        issue: req.body.subjectOfComplaint,
        description: req.body.descriptionOfComplaint,
        domId: req.body.domainOfComplaint,
        status : 'unresolved',
        dept_id: req.body.issuedToDept
    }
    
    //storing new complaint and fetching complaint id
    const comp = complaints.build(complaint)
    const complaint_id = await comp.save().then(()=>{
        return comp.complaint_id
    }).catch((err)=>{
        console.log(err)
        return null
    })

    //fetching student detail from session
    if(complaint_id == null)
        return false 
    const stu = await students.findOne({
        where:{
            username:req.session.user.username
        }
    })


    //creating student complaint entry on complaint_id received
    const studentComplaint = {
        complaint_id: complaint_id,
        stu_id: stu.enroll_no
    }
    const sc = studentComplaints.build(studentComplaint)
    
    //saving student complaint entry
    return new Promise((resolve,reject)=>{
        sc.save().then(async ()=>{
            const cd = await compltDom.findOne({
                where:{
                    domId: req.body.domainOfComplaint
                }
            })
            
            //update compltdom table to increment number of issues
            cd.totIssues = cd.totIssues + 1
            cd.totUnResolved = cd.totUnResolved + 1
            await cd.save().then(()=>{
                resolve(true)
            }).catch((err)=>{
                console.log(err); 
                resolve(false)
            })
        }).catch((err)=>{
            console.log(err)
            resolve(false)
        })
    }) 
         

}



module.exports = {
    login,
    signup,
    raiseComplaint
}

