-- Crear la base de datos
CREATE DATABASE clinica;
USE clinica;

-- Crear tabla de doctores
CREATE TABLE doctores (
    iddoctor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(70) NOT NULL,
    especialidad VARCHAR(70) NOT NULL,
    CONSTRAINT uk_nombre_doctor UNIQUE (nombre)
) ENGINE = InnoDB;

-- Insertar doctores de ejemplo
INSERT INTO doctores (nombre, especialidad)
VALUES
    ('Dr. Ana Pérez', 'Cardiología'),
    ('Dr. Luis Ramírez', 'Pediatría'),
    ('Dr. Sofía Torres', 'Dermatología');

-- Crear tabla de pacientes
CREATE TABLE pacientes (
    idpaciente INT AUTO_INCREMENT PRIMARY KEY,
    iddoctor INT NOT NULL,
    nombre_paciente VARCHAR(70) NOT NULL,
    diagnostico VARCHAR(150),
    CONSTRAINT fk_iddoctor_paciente FOREIGN KEY (iddoctor) REFERENCES doctores(iddoctor)
) ENGINE = InnoDB;

-- Insertar pacientes de ejemplo
INSERT INTO pacientes (iddoctor, nombre_paciente, diagnostico)
VALUES
    (1, 'Luis Soto', 'Arritmia cardiaca'),
    (2, 'María García', 'Fiebre persistente'),
    (3, 'Carlos Gómez', 'Dermatitis crónica'),
    (1, 'Sandra Rivera', 'Presión alta');
