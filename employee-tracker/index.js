import inquirer from 'inquirer';
import mysql from 'mysql2'

//create a db connection
var connection = mysql.createConnection({
    host:'localhost',
    port:'3308',
    user:'root',
    password:'',
    database:'employeetracker'
})

connection.connect(function(error){
    if(error) throw error;
    console.log('connected successfully at' +connection.threadId +"\n");
    myMenu()

})

//collect data from database and display
function depCollect(){
    connection.query("SELECT * FROM department", function(error, results){
        if(error) throw error;
        console.log("Departments:", results);
        connection.end();
    })
}

function roleCollect(){
    connection.query("SELECT * FROM roles", function(error, results){
        if(error) throw error;
        console.log("Roles:", results);
        connection.end();
    })
}

function employeeCollect(){
    connection.query("SELECT * FROM employees", function(error, results){
        if(error) throw error;
        console.log("Employee:", results);
        connection.end();
    })
}

function myMenu(){
    console.log("======Employee Tracker======")
    inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type:'list',
        name:'menuSelect',
        message:'select option below',
        choices:['add new department','add new role','add new employee','View employees','View Departments','View roles'],
    }
  ])
  .then(({menuSelect}) => {
    //create a switch case
    switch(menuSelect){
        case "add new department":
            addDept();
            break;
        case "add new role":
            addRole();
              break;
        case "add new employee":
            addEmployees()
               break;
        case "View employees":
            employeeCollect();
                break;
        case "View Departments":
            depCollect();
                break;
        case "View roles":
            roleCollect();
                break;
    }
  });
}

function addDept(){
    inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type:'input',
        name:'dept',
        message:'Enter department name: ',
        
    },
  ])
  .then(function(answers){
    // Use user feedback for... whatever!!
    console.log(answers);
    connection.query("INSERT INTO department SET ?", {
        department_name:answers.dept,
    },
    function(error){
        if(error) throw error;
        console.log("Department added successfully");
        depCollect();
        connection.end;
    }
    )
  })

}

function addRole(){
    inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type:'input',
        name:'jtitle',
        message:'Enter job title: ',
        
    },
    {
        type:'input',
        name:'roleid',
        message:'Enter role id: ',
        
    },
    {
        type:'checkbox',
        name:'department',
        message:'Select department:',
        choices: ['Finance', 'Legal', 'HR', 'Shipping', 'IT']
        
    },
    {
        type:'input',
        name:'salary',
        message:'Enter role salary: ',
        
    },
  ])
  .then(function(answers){
    // Use user feedback for... whatever!!
    console.log(answers);
    connection.query("INSERT INTO roles SET ?", {
        job_title:answers.jtitle,
        role_id:answers.roleid,
        department:answers.department,
        salaries:answers.salary,
    },
    function(error){
        if(error) throw error;
        console.log("Department added successfully");
        roleCollect();
        connection.end;
    }
    )
  })

}

function addEmployees(){
    inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type:'input',
        name:'fname',
        message:'Enter first name: ',
        
    },
    {
        type:'input',
        name:'lname',
        message:'Enter last name: ',
        
    },
    {
        type:'input',
        name:'jtitle',
        message:'Enter Job Title: ',
        
    },
    {
        type:'checkbox',
        name:'department',
        message:'Select department:',
        choices: ['Finance', 'Legal', 'HR', 'Shipping', 'IT']
    
    },
    {
        type:'input',
        name:'salary',
        message:'How much salary are you paid? ',
        
    },
    {
        type:'input',
        name:'manager',
        message:'Enter the name of you manager: ',
        
    },
    
  ])
  .then(function(answers){
    // Use user feedback for... whatever!!
    console.log(answers);
    connection.query("INSERT INTO employees SET ?", {
        first_name:answers.fname,
        last_name:answers.lname,
        job_title:answers.jtitle,
        department:answers.department,
        salaries:answers.salary,
        managers:answers.manager,
    },
    function(error){
        if(error) throw error;
        console.log("Employee added successfully");
        employeeCollect();
        connection.end;
    }
    )
  })

}