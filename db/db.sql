DROP DATABASE IF EXISTS talence_volley;

CREATE DATABASE talence_volley default character set 'utf8';

USE talence_volley;

CREATE TABLE joueurs (
id int(11) NOT NULL AUTO_INCREMENT,
nom VARCHAR(255) NOT NULL,
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

INSERT INTO joueurs VALUES (default, "ju"),(default, "seb"),(default, "marie"),(default, "stef"),
(default, "eric"),(default, "pierrot"),(default, "sego"),(default, "terence"),(default, "jeremy"),
(default, "benbob"),(default, "sylvain");

INSERT INTO matchs VALUES (default, "MIOS", "place François Miterrand", '1983-02-19'),
(default, "JSA", "à merignac", '2018-12-31'),
(default, "EYSINES", "salle neuve", '2018-03-30'),
(default, "VBBB", "salle de merde", '2018-02-20');