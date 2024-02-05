/*Schema for climbing gym management system. Please, someone explain, why is USER kind of reserved in POSTGRES?*/

CREATE SCHEMA climbing_gym;

SET search_path TO climbing_gym;

/*Main entities*/
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS non_membership_product (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_method (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
    id INTEGER UNIQUE NOT NULL,
    email VARCHAR(255) CHECK (birth_date <= current_date - interval '18 years' OR email IS NOT NULL) NOT NULL,
    phone VARCHAR(255) CHECK (birth_date <= current_date - interval '18 years' OR phone IS NOT NULL) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    entry_date DATE DEFAULT CURRENT_DATE NOT NULL,
    roles_id INTEGER REFERENCES roles(id) NOT NULL,
    PRIMARY KEY (id)
);

/*One to one relationships*/
CREATE TABLE IF NOT EXISTS membership (
    id SERIAL PRIMARY KEY,
    users_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
    entry_date DATE,
    end_date DATE,
    UNIQUE (users_id, product_id, entry_date)
);

/*One to many relationships*/
CREATE TABLE IF NOT EXISTS worker (
    id SERIAL PRIMARY KEY,
    users_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    roles_id INTEGER REFERENCES roles(id) NOT NULL,
    payment_method INTEGER REFERENCES payment_method(id),
    comments VARCHAR(255)
);

/*Many to many relationships*/
CREATE TABLE IF NOT EXISTS children (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES users(id),
    users_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS emergency_contact (
    id SERIAL PRIMARY KEY,
    users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    fullname VARCHAR(255) NOT NULL,
    phone INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS lesson (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES worker(users_id),
    lesson_date TIMESTAMP NOT NULL,
    duration INTERVAL NOT NULL
);

CREATE TABLE IF NOT EXISTS special_event (
    id SERIAL PRIMARY KEY,
    event_date TIMESTAMP NOT NULL,
    product_id INTEGER REFERENCES non_membership_product(id) ON DELETE CASCADE,
    descr VARCHAR(255) NOT NULL,
    duration INTERVAL NOT NULL
);

CREATE TABLE IF NOT EXISTS event_teachers (
    id SERIAL,
    event_id INTEGER REFERENCES special_event(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES worker(users_id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, teacher_id)
);

CREATE TABLE IF NOT EXISTS student_attendance (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lesson(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    attendance BOOLEAN DEFAULT NULL,
    justification VARCHAR(255),
    UNIQUE (lesson_id, student_id)
);

CREATE TABLE IF NOT EXISTS teacher_hours (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES worker(users_id) ON DELETE CASCADE,
    payment_month DATE NOT NULL,
    total_hours INTEGER NOT NULL
);

/*Basic inserts*/
INSERT INTO  roles (descr) 
VALUES 
    ('miembro'),
    ('apoderado'),
    ('trabajador'),
    ('administracion');

INSERT INTO product (descr) 
VALUES       
    ('Clases 3 por semana'),
    ('Clases 2 por semana'),
    ('Clases 1 por semana'),
    ('Mes libre');

INSERT INTO non_membership_product (descr)
VALUES
    ('Clase 1D niño'),
    ('Clase 1D adulto'),
    ('Dia libre'),
    ('Evento');

INSERT INTO payment_method (descr) 
VALUES
    ('yape'),
    ('plin'),
    ('transferencia bcp'),
    ('transferencia otros'),
    ('efectivo'),
    ('pos');