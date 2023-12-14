
CREATE DATABASE nodeapi;

USE nodeapi;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(20) NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR(70) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME
);

CREATE TABLE users (
    id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(20),
    email VARCHAR(20),
    password VARCHAR(100),
    created_at DATETIME NOT NULL,
    updated_at DATETIME
);