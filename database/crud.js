//data manipulation operations to be written here

const {con}  = require('./dbconnect')

 login = (req)=>{
    
    qry = `SELECT username FROM students WHERE username = '${req.body.loginEmail}' and password = '${req.body.loginPassword}';`
    logged = con.query(qry, (err, res) => {
         if (err)
             throw err
         if (res[0].username)
             return true
         else
             return false
     })
     return logged
}

signup = (req)=>{

}

module.exports = {
    login,
    signup
}