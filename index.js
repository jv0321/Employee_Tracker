require('console.table')

const { mainQuestions, displayTable } = require('./lib/questions');
const addDepartment = require('./lib/department');
const addRole = require('./lib/role');
const addEmployee = require('./lib/employee');
const updateEmployeeRole = require('./lib/db');
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_tracker',
  password: 'pass',
  port: 5432
});

async function start() {
  try {
    await client.connect();
    console.log('Connected to the database');

    let answer;
    do {
      answer = await mainQuestions();

      switch (answer.main) {
        case 'View all departments':
        case 'View all roles':
        case 'View all employees':
          await displayTable(answer, client);
          break;

        case 'Add a department':
          await addDepartment(client);
          break;

        case 'Add a role':
          await addRole(client);
          break;

        case 'Add an employee':
          await addEmployee(client);
          break;

        case 'Update an employee role':
          await updateEmployeeRole(client);
          break;

        case 'Exit':
          process.exit();
          break;

        default:
          console.log('Invalid choice');
      }
    } while (answer.main !== 'Exit');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
    console.log('Disconnected from the database');
  }
}

start();
