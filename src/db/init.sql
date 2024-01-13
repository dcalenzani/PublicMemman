/*Schema for climbing gym management system. Please, someone explain, why is USER kind of reserved in POSTGRES?*/

CREATE SCHEMA climbing_gym;

SET search_path TO climbing_gym;

/*Tables for people*/
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
    id INTEGER UNIQUE PRIMARY KEY NOT NULL,
    email VARCHAR(255) CHECK (birth_date <= current_date - interval '18 years' OR email IS NOT NULL) NOT NULL,
    phone INTEGER CHECK (birth_date <= current_date - interval '18 years' OR phone IS NOT NULL) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    entry_date DATE DEFAULT CURRENT_DATE NOT NULL,
    roles_id INTEGER REFERENCES roles(id)
);

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

/*Payments tables*/
CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_method (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS payment (
    id SERIAL PRIMARY KEY,
    users_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES product(id),
    amount INTEGER NOT NULL,
    date_of_payment DATE NOT NULL,
    payment_method INTEGER REFERENCES payment_method(id)
);

CREATE TABLE IF NOT EXISTS salary_type (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL
);

/*Gym Management*/
CREATE TABLE IF NOT EXISTS worker (
    id SERIAL PRIMARY KEY,
    users_id INTEGER REFERENCES users(id) NOT NULL UNIQUE ON DELETE CASCADE,
    roles_id INTEGER REFERENCES roles(id) NOT NULL,
    payment_method INTEGER REFERENCES payment_method(id),
    salary_type INTEGER REFERENCES salary_type(id) NOT NULL,
    bio VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS membership (
    id SERIAL PRIMARY KEY,
    users_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    product_id INTEGER REFERENCES product(id) NOT NULL,
    entry_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS lesson(
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES worker(users_id),
    lesson_date TIMESTAMP NOT NULL,
    duration INTERVAL NOT NULL
);

CREATE TABLE IF NOT EXISTS student_attendance (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lesson(id) NOT NULL ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    attendance BOOLEAN DEFAULT NULL,
    justification VARCHAR(255)
);