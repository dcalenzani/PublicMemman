SET search_path TO climbing_gym;

INSERT INTO  roles (descr) 
VALUES ('alumno'),('miembro'),('apoderado'),('entrenador'),('administracion');

INSERT INTO product (descr, price) 
VALUES       
    ('mensualidad',180),
    ('clases 1 por semana', 240),
    ('clases 2 por semana', 280),
    ('dia libre', 20),
    ('clase 1D niño', 40),
    ('clase 1D adulto', 60);

INSERT INTO payment_method (descr) 
VALUES
    ('yape'),
    ('transferencia_bcp'),
    ('transferencia_otros'),
    ('efectivo'),
    ('pos');

INSERT INTO salary_type (descr) 
VALUES
    ('pago fijo'), ('pago por hora');