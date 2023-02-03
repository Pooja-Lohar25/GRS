const {con} = require('./dbconnect')

createdepts = (con)=>{
    var qry  = `CREATE TABLE depts(
        deptId varchar(20) primary key,
        name varchar(50),
        hod varchar(50));`
    con.query(qry,(err,res,fields)=>{
        if(err) throw err
       // console.log('dept table created!')
    })
}

createemp = (con)=>{
    qry  = `CREATE TABLE emp(
        empId varchar(20) primary key,
        name varchar(50),
        desig varchar(50),
        deptId varchar(20),
        scores int,
        username varchar(50),
        password varchar(80),
        FOREIGN KEY (deptId) REFERENCES depts(deptId));`

    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        //console.log('emp table created!')
    })
}

createadmins = (con)=>{
     
    qry  = `CREATE TABLE admins(
        empId varchar(20) primary key,
        name varchar(50),
        desig varchar(50),
        username varchar(50),
        password varchar(80));`

    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        //console.log('admins table created!')
    })
}

createstudents = (con)=>{
    qry  = `CREATE TABLE students(
        enroll varchar(15) primary key,
        name varchar(50),
        branch varchar(10),
        course varchar(10),
        semester varchar(10),
        username varchar(50),
        password varchar(80));`

    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        //console.log('student table created!')
    })
}

createcomplaints = (con)=>{
    qry  = `CREATE TABLE complaints(
        cmpId int auto_increment primary key,
        domId varchar(10),
        issue varchar(1000),
        status varchar(2), 
        deptId varchar(20),
        FOREIGN KEY (deptId) REFERENCES depts(deptId));`

    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        //console.log('complaints table created!')
    })
}

createstudcomp = (con)=>{
    qry  = `CREATE TABLE studComp(
        enroll varchar(15) ,
        cmpId int,
        Date date,
        FOREIGN KEY (enroll) REFERENCES students(enroll),
        FOREIGN KEY (cmpId) REFERENCES complaints(cmpId)
        );`

    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        //console.log('studComp table created!')
    })
}

createcompltdom = (con)=>{
    
    qry  = `CREATE TABLE compltDom(
        domId varchar(10) primary key,
        domain varchar(30),
        totissues int,
        notaddressed int);`

    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        //console.log('compltDom table created!')
    })

}

insertComltdom = (con)=>{
  
    con.query(`INSERT INTO compltdom VALUES('LIB','Library',0, 0);`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })
    
    con.query(`INSERT INTO compltdom VALUES('MT','Maintenance',0, 0);`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })
    
    con.query(`INSERT INTO compltdom VALUES('TT','Time Table Structure',0, 0);`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })        
    
    con.query(`INSERT INTO compltdom VALUES('AC','Academics',0, 0);`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })        
    
    con.query(`INSERT INTO compltdom VALUES('PNT','Placement and Training',0,0);`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })        
    
    con.query(`INSERT INTO compltdom VALUES('MSCON','Misconduct',0,0);`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })        
    
    con.query(`INSERT INTO compltdom VALUES('RAG','Ragging',0,0);`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })        
    
    con.query(`INSERT INTO compltdom VALUES('OTH','Other',0,0);`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })
}

insertdepts = (con)=>{
    con.query(`INSERT INTO depts VALUES('CSE','Computer Science and Engineering','cshod');`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })
    con.query(`INSERT INTO depts VALUES('ME','Mechanical Engineering','mehod');`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })
    con.query(`INSERT INTO depts VALUES('EX','Electrical Engineering','exhod');`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })
    con.query(`INSERT INTO depts VALUES('EC','Electronics','echod');`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })
    con.query(`INSERT INTO depts VALUES('CE','Civil Engineering','cehod');`,(err)=>{
        if(err) throw err
        //console.log('values inserted')))
    })
}




createdepts(con)
createemp(con)
createadmins(con)
createstudents(con)
createcomplaints(con)
createstudcomp(con)
createcompltdom(con)
insertComltdom(con)
insertdepts(con)
