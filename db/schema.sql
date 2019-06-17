USE burgers_db;

CREATE TABLE burgers(
id INT(5) auto_increment NOT NULL PRIMARY KEY,
burger_name VARCHAR (100),
devoured BOOLEAN NOT NULL
);
