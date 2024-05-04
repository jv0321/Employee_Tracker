const { getRoleList } = require('./questions');
const inquirer = require('inquirer');

async function addAnEmployee(client) {
  const roleChoices = await getRoleList(client);
  const managerChoices = await managerList(client);
  const employeeAnswers = await employeeQuestions(roleChoices, managerChoices);
  await addEmployee(employeeAnswers, client);
}

async function managerList(client) {
  const managerNames = await client.query(`SELECT manager.id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employees INNER JOIN employees manager on employees.manager_id = manager.id`);
  const managerList = managerNames.rows.map(row => ({
    name: row.manager_name,
    value: row.id
  }));
  return managerList;
}

function employeeQuestions(roleChoices, managerChoices) {
  const questions = [
    {
      name: 'empFirstName',
      message: 'Enter the employee\'s first name.'
    },
    {
      name: 'empLastName',
      message: 'Enter the employee\'s last name.'
    },
    {
      name: 'empRole',
      type: 'list',
      message: 'Select the employee\'s role.',
      choices: roleChoices
    },
    {
      name: 'empManager',
      type: 'list',
      message: 'Select the employee\'s manager.',
      choices: managerChoices
    }
  ];
  return inquirer.prompt(questions);
}

async function addEmployee(answers, client) {
  const insertQuery = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
  const values = [answers.empFirstName, answers.empLastName, answers.empRole, answers.empManager];

  try {
    await client.query(insertQuery, values);
    console.log('Employee added successfully.');
  } catch (error) {
    console.error('Error adding an employee:', error);
  }
}

module.exports = addAnEmployee
