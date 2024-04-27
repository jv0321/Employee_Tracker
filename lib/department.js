const inquirer = require('inquirer');

async function addADepartment(client) {
  const departmentAnswer = await departmentQuestion();
  await addDepartment(departmentAnswer, client);
}

function departmentQuestion() {
  const question = [{
    name: 'addDept',
    message: 'Enter the name of the department you want to add.',
  }];
  return inquirer.prompt(question);
}

async function addDepartment(answer, client) {
  const insertQuery = 'INSERT INTO departments (name) VALUES ($1)';
  const values = [answer.addDept];

  try {
    await client.query(insertQuery, values);
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding Department:', error);
  }
}

module.exports = addADepartment;
