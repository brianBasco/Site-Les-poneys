USE poneysdeplmoi;

CREATE TABLE connexion (
id int(11) NOT NULL AUTO_INCREMENT,
mdp VARCHAR(1024) NOT NULL,
PRIMARY KEY(id)
)

ENGINE = INNODB;

INSERT INTO connexion(mdp) VALUES ("passeurpenetrant");

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
heure TIME NOT NULL,
PRIMARY KEY(id)
)

ENGINE = INNODB;

CREATE TABLE presence (
id int(11) NOT NULL AUTO_INCREMENT,
num_match int(11) NOT NULL,
num_joueur int(11) NOT NULL,
present int(11) NOT NULL,
VoteAction int(11) NOT NULL,
VoteCagade int(11) NOT NULL,
PRIMARY KEY(id)
)

ENGINE = INNODB;

CREATE TABLE commentaires (
id int(11) NOT NULL AUTO_INCREMENT,
num_match int(11) NOT NULL,
nom_joueur VARCHAR(255) NOT NULL,
commentaire VARCHAR(255) NOT NULL,
PRIMARY KEY(id)
)

ENGINE = INNODB;

CREATE TABLE VoteAction (
id int(11) NOT NULL AUTO_INCREMENT,
num_match int(11) NOT NULL,
num_vote int(11) NOT NULL,
PRIMARY KEY(id)
)

ENGINE = INNODB;

CREATE TABLE VoteCagade (
id int(11) NOT NULL AUTO_INCREMENT,
num_match int(11) NOT NULL,
num_vote int(11) NOT NULL,
PRIMARY KEY(id)
)

ENGINE = INNODB;

INSERT INTO joueurs (id,nom,mail,photo) VALUES 
(default, "ju", "julien.dablemont@elitt-sas.fr", "ju.png"),
(default, "seb", "bast620@gmail.com", "default.svg"),
(default, "marie", "baget.marie@gmail.com", "marie.png"),
(default, "stef","stephane.meynard@nouvelle-aquitaine.fr", "stef.png"),
(default, "eric","ericveber@hotmail.com", "eric.png"),
(default, "pierrot","pierrepers2@gmail.com", "pierrot.png"),
(default, "sego","sego_debay@yahoo.fr", "sego.png"),
(default, "jeremy","jeremy.dumont2@gmail.com", "jeremy.png"),
(default, "benbob","coyoben45@aol.com", "benbob.png"),
(default, "sylvain", "sylvod@hotmail.com", "sylvain.png");