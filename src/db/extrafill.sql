INSERT INTO  users (id, email, phone, pass, fullname, birth_date, entry_date, roles_id) 
VALUES    
    (22222222, 'alumno@mail.com', 888888888, 'password', 'alumno_test', '2015-01-01', '2023-01-01', 1),
    (33333333, 'miembro@mail.com',777777777, 'password', 'miembro_test', '1990-01-01', '2020-01-01', 2),
    (44444444, 'profesor@mail.com', 666666666, 'password', 'profesor_test', '1990-01-01', '2020-01-01', 4),
    (55555555, 'entrenador@mail.com', 555555555, 'password', 'entrenador_test', '1990-01-01', '2020-01-01', 4),
    (66666666, 'padre@mail.com', 444444444, 'password', 'padre_test', '1990-01-01', '2020-01-01', 3);

INSERT INTO children (parent_id, users_id) VALUES (66666666, 22222222);

INSERT INTO emergency_contact (users_id, fullname, phone) VALUES (22222222, 'contacto_test', 333333333);

INSERT INTO payment (users_id, product_id, amount, date_of_payment, payment_method) VALUES (22222222, 1, 180, '2020-01-01', 1);

INSERT INTO worker (users_id, roles_id, payment_method, salary_type, bio) VALUES (44444444, 4, 1, 1, 'bio_test');

INSERT INTO worker (users_id, roles_id, payment_method, salary_type, bio) VALUES (55555555, 4, 1, 2, 'bio_test_2');

INSERT INTO membership (users_id, entry_date) VALUES (33333333, '2024-01-01');

INSERT INTO membership (users_id, entry_date) VALUES (22222222, '2024-01-01');

INSERT INTO lesson (teacher_id, lesson_date, duration) 
VALUES 
    (44444444, '2024-01-17 10:00:00',  '1 hour 30 minutes'),
    (55555555, '2024-01-25 17:30:00', '1 hour')
;

INSERT INTO student_attendance (student_id, lesson_id) VALUES
    (22222222, 1),
    (22222222, 2)
;
