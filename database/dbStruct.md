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

complaints
-   cmpId(pk)
-   issue
-   domId(fk)
-   status
-   deptId (fk)

studComp
-   enroll(fk)
-   cmpId(fk)

compltDom
-   domId(pk)
-   domain
-   totIssues
-   addressed