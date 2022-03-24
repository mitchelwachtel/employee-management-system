INSERT INTO department (name)
VALUES ('Sales'),
    ('Warehouse'),
    ('Delivery'),
    ('Management'),
    ('Accounting');
INSERT INTO role (title, salary, department_id)
VALUES ("Cold Caller", 50000, 1),
    ("Head of Sales", 75000, 1),
    ("Forklift Driver", 28000, 2),
    ("Clipboard Holder", 39000, 2),
    ("Driver", 32000, 3),
    ("Lifter", 32000, 3),
    ("Executive", 90000, 4),
    ("Accountant", 65000, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gerald", "Hayes", 4, null),
    ("Susie", "Portman", 2, null),
    ("Lars", "Metalfingers", 3, null),
    ("Jerald", "Llamacomb", 4, 1),
    ("Lava", "Volcano", 5, 2),
    ("Mama", "Goldberg", 6, 3),
    ("Pierce", "Brosnan", 7, null),
    ("Kate", "Spade", 8, 7);