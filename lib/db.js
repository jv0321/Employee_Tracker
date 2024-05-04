const { roleList } = require('./questions');
const inquirer = require('inquirer');

async function updateEmployeeRole(client) {
  const empList = await getEmployeeList(client);
  const selectedEmployee = await selectEmployee(empList);
  const roles = await roleList(client);
  const selectedRole = await selectRole(roles);
  await updateEmployee(selectedRole, selectedEmployee, client);
}

async function getEmployeeList(client) {
  const queryResult = await client.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees`);
  const employeeList = queryResult.rows.map(row => ({
    name: row.full_name,
    value: row.id
  }));
  return employeeList;
}

async function selectEmployee(employeeList) {
  const question = [{
    name: 'selectedEmployee',
    type: 'list',
    message: 'Choose an employee to update.',
    choices: employeeList
  }];
  const { selectedEmployee } = await inquirer.prompt(question);
  return selectedEmployee;
}

async function selectRole(roleList) {
  const question = [{
    name: 'selectedRole',
    type: 'list',
    message: 'Choose new role',
    choices: roleList
  }];
  const { selectedRole } = await inquirer.prompt(question);
  return selectedRole;
}

async function updateEmployee(role, employeeId, client) {
  const updateQuery = {
    text: 'UPDATE employees SET role_id = $1 WHERE id = $2',
    values: [role, employeeId]
  };
  try {
    await client.query(updateQuery);
    console.log('Role changed successfully');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

module.exports = updateEmployeeRole;
