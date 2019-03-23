DROP DATABASE IF EXISTS connexionPoneys;

CREATE DATABASE connexionPoneys default character set 'utf8';

USE connexionPoneys;

CREATE TABLE connexion (
id int(11) NOT NULL AUTO_INCREMENT,
mdp VARCHAR(1024) NOT NULL,
PRIMARY KEY(id)
)

ENGINE = INNODB;

INSERT INTO connexion(mdp) VALUES ("talence");