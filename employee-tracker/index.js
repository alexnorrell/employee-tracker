import inquirer from 'inquirer';
import mysql from 'mysql2';

//creat a db connection
var connection = mysql.createConnection({
    host: 'localhost',
    port:'3308',
    user: 'root',
    password:'',
    database: 'employeetracker'
    })

connection.connect(function(error){
    if(error) throw error;
    console.log('connected successfully at' +connection.threadId +"\n");
    myMenu()
})

function depCollect(){
    console.query("SELECT * FROM departmen", function(error, results){
        if(error) throw error;
        console.log("Departments", results);
        connection.end();
    })
}

function myMenu (){
    console.log('welcome to employee tracker')
    
inquirer
  .prompt([
    {
        type: 'list',
        name: 'menuSelect',
        message: 'Select any option.',
        choices: ['Add new Department', 'Add new role', 'Add new User', 'View employees', 'view departments', 'view roles'],
    }
  ])
  .then(({menuSelect}) => {
    //creat a switch case
    switch(menuSelect){
        case "Add new department":
                addDept();
                break;
    }
  });
}

function addDept(){
    inquirer
  .prompt([
    {
        type: 'input',
        name: 'dept',
        message: 'Enter Department name: ',
       
    },
  ])
  .then(function(answers){
    console.log(answers);
    connection.query("INSERT INTO department SET ?", {
        department_name :answers.dept,
    },
    function(error){
        if(error) throw error;
        console.log("department added successfully");
        depCollect();
        connection.end;
    }
    )
  })
}


