const inquirer = require('inquirer');

async function addARole(client) {
  const departmentChoices = await departmentList(client);
  const roleAnswers = await roleQuestions(departmentChoices);
  await addRole(roleAnswers, client);
}

async function departmentList(client) {
  const departmentNames = await client.query("SELECT id, name FROM departments");
  const departmentList = departmentNames.rows.map(row => ({
    name: row.name,
    value: row.id
  }));
  return departmentList;
}

function roleQuestions(departmentList) {
  const questions = [
    {
      name: 'addRole',
      message: 'Enter the name of the role you want to add.'
    },
    {
      name: 'roleDepartment',
      type: 'list',
      message: 'Select the department for this role.',
      choices: departmentList
    },
    {
      name: 'roleSalary',
      message: 'Enter the salary for this role.',
      validate: (input) => {
        if (isNaN(input)) {
          return 'Please enter a number:';
        }
        return true;
      }
    }
  ];
  return inquirer.prompt(questions);
}

async function addRole (answers, client) {
  const insertQuery = 'INSERT INTO roles (title, department_id, salary) VALUES ($1, $2, $3)';
  const values = [answers.addRole, answers.roleDepartment, answers.roleSalary];

  try {
    await client.query(insertQuery, values);
    console.log('Role added successfully!');
  } catch (error) {
    console.error('Error adding a Role:', error);
  }
}

module.exports = addARole;
