-- Insert departments
INSERT INTO departments (name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

-- Insert roles
INSERT INTO roles (title, department_id, salary)
VALUES
('Sales Lead', 2, 100000),
('Salesperson', 2, 80000),
('Lead Engineer', 1, 150000),
('Software Engineer', 1, 120000),
('Account Manager', 4, 160000),
('Accountant', 4, 125000),
('Legal Team Lead', 3, 250000),
('Lawyer', 3, 190000);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 3),
('Kunal', 'Singh', 5, NULL),
('Malia', 'Brown', 6, 5);
