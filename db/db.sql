DROP DATABASE IF EXISTS talence_volley;

CREATE DATABASE talence_volley default character set 'utf8';

USE talence_volley;

CREATE TABLE joueurs (
id int(11) NOT NULL AUTO_INCREMENT,
nom VARCHAR(255) NOT NULL,
mail VARCHAR(255),
photo VARCHAR(255),
PRIMARY KEY(id)
)

ENGINE = INNODB;

CREATE TABLE matchs (
id int(11) NOT NULL AUTO_INCREMENT,
nom VARCHAR(255) NOT NULL,
adresse VARCHAR(255) NOT NULL,
date_match DATE NOT NULL,
PRIMARY KEY(id)
)

ENGINE = INNODB;

CREATE TABLE presence (
id int(11) NOT NULL AUTO_INCREMENT,
num_match int(11) NOT NULL,
num_joueur int(11) NOT NULL,
present int(11) NOT NULL,
PRIMARY KEY(id)
)

ENGINE = INNODB;

INSERT INTO joueurs (id,nom,mail,photo) VALUES 
(default, "ju", "julien.dablemont@elitt-sas.fr", "default"),
(default, "seb", "bast620@gmail.com", "default"),
(default, "marie", "baget.marie@gmail.com", "default"),
(default, "stef","stephane.meynard@nouvelle-aquitaine.fr", "default"),
(default, "eric","ericveber@hotmail.com", "default"),
(default, "pierrot","pierrepers2@gmail.com", "default"),
(default, "sego","sego_debay@yahoo.fr", "default"),
(default, "terence", "rien", "default"),
(default, "jeremy","rien", "default"),
(default, "benbob","coyoben45@aol.com", "default"),
(default, "sylvain", "sylvod@hotmail.com", "default");



