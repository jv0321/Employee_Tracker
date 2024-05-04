
INSERT INTO departments (name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');


INSERT INTO roles (title, department_id, salary)
VALUES
('Sales Lead', 2, 110000),
('Salesperson', 2, 90000),
('Lead Engineer', 1, 140000),
('Software Engineer', 1, 135000),
('Account Manager', 4, 60000),
('Accountant', 4, 305000),
('Legal Team Lead', 3, 350000),
('Lawyer', 3, 290000);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Alice', 'Johnson', 1, NULL),
('Bob', 'Smith', 2, 1),
('Eva', 'Garcia', 3, NULL),
('David', 'Lee', 4, 3),
('Sophia', 'Martinez', 5, NULL),
('James', 'Wilson', 6, 5);
