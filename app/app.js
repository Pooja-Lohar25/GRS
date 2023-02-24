const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const ejs = require("ejs");

//importing routes
<<<<<<< HEAD
const { student,faculty,index,admin,login, signup, dashboard, newcomplaint , upvotes,profile, comp} = require("./routes");
=======
const { faculty,student,index,admin,login, signup, dashboard, newcomplaint , upvotes,profile, comp} = require("./routes");
>>>>>>> 3e9b7e661e199f6e6b599c06f3cee424d0701f67

app.set("views", path.resolve(__dirname, "../assets", "../assets"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parsing form data to access it in routes

//creating session
app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours
    resave: true,
    saveUninitialized: false,
  })
);
  
app.use('/student',student)
app.use('/faculty',faculty)
app.use('/setstatus',faculty)

//routes
app.use('/',index)
app.use('logout',index)
app.use('/admin',admin)
app.use("/login", login);
app.use("/signup", signup);
app.use("/dashboard", dashboard);
app.use("/newcomplaint", newcomplaint);
app.use("/upvotes",upvotes)
app.use('/profile',profile)

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
