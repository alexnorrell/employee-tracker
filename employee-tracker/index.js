import inquirer from 'inquirer';
import mysql from 'mysql2';

function myMenu (){
    console.log('welcome to employee tracker')
    
inquirer
  .prompt([
    {
        type: 'input',
        name: 'username',
        message: 'Enter your name.',
    },
    {
        type: 'list',
        name: 'menu',
        message: 'Select any option.',
        choices: ['create new user', 'creat department']
    }
  ])
  .then((answers) => {
    console.log(answers)
  })
}

myMenu();

