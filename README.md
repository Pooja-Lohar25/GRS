# GRS
Grievance Redressal System

The system is designed and developed to address the issue of grienvance registration for college students in their respective colleges or universities.<br>
Systems's sole purpose is to make students' complaints heard by the authorities of the colleges so that they can be addressed as soon as possible.<br>

<b> UNIQUE FEATURE: </b> Faculties would be granted scores by the admins on the basis of how they handle an issue and time they took to address. 

## Modules
- Student
- Faculties
- Admins 

### Student
Functional Requirements 
- Login/Registration
- Raise Complaint
- Upvote a complaint
- Fill Feedbacks

### Faculties
Functional Requirements
- Login/Resgitration
- Complaint handling and addressing timely
- Create Feedback form

### Admins
All HODs and higher authorities(Principal,Vice Principal etc) of the university and college.<br>
Selection of Admin depends on the institute.
- Login/Resgitration
- View Performance of Faculties
- Grant Scores


## Database requirements
Note : <u>Pre install MySQL database</u> <br>
<b> Edit database.dbconnect with your database credentials </b>

```node
const myhost = 'localhost'
const mysqlUser = 'root'
const pass = 'rootPassword'
const dbname = 'databaseName' //must be already created

const con = mysql.createConnection({
  host: myhost, 
  user: mysqlUser, 
  password: pass, 
  database: dbname,
});
```

#### Install and connect mysql in node
  ```
  > npm install mysql
  ```
  To connect and setup the database automatically, run database/dbsetup.js file in terminal <br>
  ```
  > node database/dbsetup
  ```
  
  
## Start the server
  ```
  > npm run dev
  ```
## Run the application
  Type localhost:4000 in the browser
  
## Stop the server
  ```
  > press ctrl + c in terminal
  > Terminate batch job (Y/N)? y
  ```
