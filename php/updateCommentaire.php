<?php

ini_set('display_errors', true);
error_reporting (E_ALL);

    require 'ConnexionDb.php';

    echo '<h1>Bienvenue dans le débug</h1>';

    $num_match = (int)$_GET['num_match'];
    $nom_joueur = $_GET['nom_joueur'];
    $commentaire = $_GET['commentaire'];
    
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    //update de la bdd, à chaque match créé la table presence doit être initialisée avec 0
    $req = $pdo->prepare("INSERT INTO 
        commentaires (num_match, nom_joueur, commentaire) 
        VALUES (?,?,?)") or exit(print_r($pdo->errorInfo()));
    $req->execute(array($num_match, $nom_joueur, $commentaire));

?>