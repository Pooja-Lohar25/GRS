createTable = (con)=>{
    const qry  = `CREATE TABLE emp(id int,name varchar(50));`
    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        console.log('table created!')
    })
}
dropTable = (con)=>{
    const qry  = `DROP TABLE EMP;`
    con.query(qry,(err,res,fields)=>{
        if(err) throw err
        console.log('table deleted!')
    })
}
insertRec = (con)=>{

}
selectRec = (con)=>{
    
}
module.exports = {
    createTable,
    dropTable,
    insertRec,
    selectRec
}