const {con} = require('./dbconnect')


createTables = (con)=>{
    var qry  = `CREATE TABLE depts(
        deptId varchar(20) primary key,
        name varchar(50),
        hod varchar(50));`
    con.query(qry,(err,res,fields)=>{
        if(err) throw err
       // console.log('dept table created!')
    })
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

    qry  = `CREATE TABLE complaints(
        cmpId varchar(20) primary key,
        issue varchar(1000),
        domId varchar(10),
        status varchar(2), 
        deptId varchar(20),
        FOREIGN KEY (deptId) REFERENCES depts(deptId));`

    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        //console.log('complaints table created!')
    })

    qry  = `CREATE TABLE studComp(
        enroll varchar(15) ,
        cmpId varchar(20) ,
        FOREIGN KEY (enroll) REFERENCES students(enroll),
        FOREIGN KEY (cmpId) REFERENCES complaints(cmpId)
        );`

    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        //console.log('studComp table created!')
    })

    qry  = `CREATE TABLE compltDom(
        domId varchar(10) primary key,
        domain varchar(20),
        totissues int);`

    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        //console.log('compltDom table created!')
    })

}


createTables(con)