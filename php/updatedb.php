<?php

    require 'ConnexionDb.php';

    echo '<h1>Bienvenue dans le débug</h1>';

    $row = (int)$_GET['ligne'];
    $presence = (int)$_GET['presence'];

    echo 'numMatch = '.$_GET['match'];
    
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    //update de la bdd, à chaque match créé la table presence doit être initialisée avec 0
    $req = $pdo->prepare("UPDATE presence SET present=(?) WHERE id=(?)") or exit(print_r($pdo->errorInfo()));
    $req->execute(array($presence,$row));

?>