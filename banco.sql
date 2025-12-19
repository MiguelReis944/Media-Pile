CREATE DATABASE trabalho;
USE trabalho;
CREATE TABLE filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    comentario TEXT,
    nota INT CHECK (nota BETWEEN 0 AND 10) NULL,
    capa_url VARCHAR(500),
    concluido TINYINT(1) NOT NULL 
);
CREATE TABLE series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    comentario TEXT,
    nota INT CHECK (nota BETWEEN 0 AND 10) NULL,
    capa_url VARCHAR(500),
    concluido TINYINT(1) NOT NULL 
);
CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    comentario TEXT,
    nota INT CHECK (nota BETWEEN 0 AND 10) NULL,
    capa_url VARCHAR(500),
    concluido TINYINT(1) NOT NULL 
);
CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    comentario TEXT,
    nota INT CHECK (nota BETWEEN 0 AND 10) NULL,
    capa_url VARCHAR(500),
    concluido TINYINT(1) NOT NULL 
);
CREATE TABLE perfil (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    foto_url VARCHAR(255)
);
INSERT INTO perfil (id, nome, foto_url)
VALUES (1, 'Seu Nome', 'https://link.da.sua.foto.com');