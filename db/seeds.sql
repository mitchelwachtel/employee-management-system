INSERT INTO department (name)
VALUES ('Sales'),
    ('Warehouse'),
    ('Delivery'),
    ('Management'),
    ('Accounting');
INSERT INTO role (title, salary, department_id)
VALUES ("Cold Caller", 50000, 1),
    ("Head of Sales", 75000, 1),
    ("Forklift Guy", 28000, 2),
    ("Clipboard Guy", 39000, 2),
    ("Driver", 32000, 3),
    ("Lifter", 32000, 3),
    ("Executive", 90000, 4),
    ("Accountant", 65000, 5);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Gerald", "Hayes", 1),
    ("Susie", "Portman", 2),
    ("Lars", "Metalfingers", 3),
    ("Jerald", "Llamacomb", 4),
    ("Lava", "Volcano", 5),
    ("Mama", "Goldberg", 6),
    ("Pierce", "Brosnan", 7),
    ("Kate", "Spade", 8);