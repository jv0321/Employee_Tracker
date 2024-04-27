-- Retrieve all columns from the employees table and join it with the roles table on the title column
SELECT * 
FROM employees 
LEFT JOIN roles 
ON employees.title = roles.title;

-- Retrieve the full names of all employees from the employees table
SELECT CONCAT(first_name, ' ', last_name) AS full_name 
FROM employees;

-- Retrieve the id, title, department_name, and salary columns from the roles and departments tables, joined on the department_id
SELECT roles.id, roles.title, departments.name AS department_name, roles.salary
FROM roles 
JOIN departments 
ON roles.department_id = departments.id;

-- Retrieve the id, full_name, title, department_name, and salary columns from the employees, roles, and departments tables, joined on their respective foreign keys
SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS full_name, roles.title, departments.name AS department_name, roles.salary 
FROM employees 
JOIN roles ON employees.role_id = roles.id 
JOIN departments ON roles.department_id = departments.id;
