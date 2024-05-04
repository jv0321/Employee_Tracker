const inquirer = require('inquirer');

function mainQuestions() {
  const questions = [
    {
      name: 'main',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }]
  return inquirer.prompt(questions);
}

async function displayTable(answer, client) {
  switch (answer.main) {
    case 'View all departments':
      const departmentTable = await client.query('SELECT * FROM departments');
      console.table(departmentTable.rows);
      break;

    case 'View all roles':
      const rolesTable = await client.query(`
      SELECT roles.id, roles.title, departments.name AS department_name, roles.salary
      FROM roles 
      JOIN departments 
      ON roles.department_id = departments.id
      `);
      console.table(rolesTable.rows);
      break;

    case 'View all employees':
      const employeesTable = await client.query(`
      SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department_name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employees 
      JOIN roles ON employees.role_id = roles.id 
      JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees manager ON employees.manager_id = manager.id
      `);
      console.table(employeesTable.rows);
      break;

    default:
      console.log('Invalid choice');
      break;
  } 
}

async function getRoleList(client) {
  const roleTitles = await client.query("SELECT id, title FROM roles");
  const rolesList = roleTitles.rows.map(row => ({
    name: row.title,
    value: row.id
  }));
  return rolesList;
}
 
module.exports = { mainQuestions, displayTable, getRoleList };
