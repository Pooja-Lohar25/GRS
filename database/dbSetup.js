//creates all tables in the connected database


const createTables = ()=>{

    const {sequelize} = require('./dbconnect')
    
    const {
        depts,
        emp,
        admins,
        students,
        compltDom,
        complaints,
        studentComplaints
    } = require('../database/models')
    
    
    depts.sync({alter:true}).then(()=>{console.log('depts synced')}).then(()=>{
        emp.sync({alter:true}).then(()=>{console.log('emp synced')}).then(()=>{
            admins.sync({alter:true}).then(()=>{console.log('admins synced')}).then(()=>{
                students.sync({alter:true}).then(()=>{console.log('students synced')}).then(()=>{
                    compltDom.sync({alter:true}).then(()=>{console.log('compltDom synced')}).then(()=>{
                        complaints.sync({alter:true}).then(()=>{console.log('complaints synced')}).then(()=>{
                            studentComplaints.sync({alter:true}).then(()=>{console.log('studentComplaints synced')})
                        })
                    })
                })
            })
        })
    }).then(()=>{
          sequelize.sync({alter:true}).then(()=>{console.log('all synced')})
    })
}

module.exports = {
    createTables
}