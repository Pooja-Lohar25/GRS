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


 login = async  (req)=>{
    
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
        return result
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
    //TODO:take user details from session variables
    
    const complaint = {
        issue: req.body.subjectOfComplaint,
        description: req.body.descriptionOfComplaint,
        domId: req.body.domainOfComplaint,
        status : 'unresolved',
        dept_id: req.body.issuedToDept
    }
    const comp = complaints.build(complaint)
    return comp.save().then(()=>{
        return true
    }).catch((err)=>{
        console.log(err)
        return false
    })
    
}

module.exports = {
    login,
    signup,
    raiseComplaint
}

