Depts 
-   deptId (pk)
-   name 
-   hod

Emp
-   empId(pk)
-   name
-   desig
-   deptId(fk)
-   scores
-   username
-   password
-   phone

Admins
-   empId (pk)
-   name
-   desig
-   username
-   password

students
-   enroll(pk)
-   name
-   branch
-   course
-   semester
-   username(email)
-   password
-   phone

compltDom
-   domId(pk)
-   domain
-   totIssues
-   addressed

complaints
-   cmpId(pk)
-   issue
-   domId(fk)
-   status
-   deptId (fk)

studComp
-   enroll(fk)
-   cmpId(fk)

