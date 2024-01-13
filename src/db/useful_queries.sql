SELECT 
    users.id as DNI,
    users.fullname as Nombre,
    users.birth_date as "Fecha de nacimiento",
    users.phone as Telefono, email as Email,
    payment_method.descr as "Metodo de pago",
    salary_type.descr as "Tipo de salario"
FROM climbing_gym.worker 
INNER JOIN climbing_gym.users ON worker.users_id = users.id 
INNER JOIN climbing_gym.payment_method ON worker.payment_method = payment_method.id
INNER JOIN climbing_gym.salary_type ON worker.salary_type = salary_type.id;

DELETE FROM climbing_gym.users WHERE fullname = 'Jane Doe';

INSERT INTO climbing_gym.users (id, fullname, email, phone, pass, birth_date, roles_id) 
      VALUES (
       2, 'Jane Doe', 'dcalenzani95@gmail,com', 999999999, 1, '1990-01-01', 2);