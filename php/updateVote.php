<?php

ini_set('display_errors', true);
error_reporting (E_ALL);

    require 'ConnexionDb.php';

    //Mécanisme de contrôle de vote
    //ligne sql de la table presence
    $ligne = (int)$_GET['ligne'];
    $numMatch = (int)$_GET['num_match'];
    $numVote = (int)$_GET['num_vote'];
    $queryVote = $_GET['query'];

    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $res;

    $reqControle = $pdo->prepare("SELECT {$queryVote} FROM presence WHERE id=(?)") or exit(print_r($pdo->errorInfo()));
    $reqControle->execute(array($ligne));
    while($row = $reqControle->fetch()){
        $res = (int)$row[$queryVote];
    }

    if($res == 1) echo "Vous avez déjà voté";
    else {
        //on passe le vote à 1 dans presence
        $a_vote = 1;
        
        //update de presence à 1
        $req = $pdo->prepare("UPDATE presence SET {$queryVote}=(?) WHERE id=(?)") or exit(print_r($pdo->errorInfo()));
        $req->execute(array($a_vote,$ligne));

        //Enregistrement dans la table votes
        $reqVote = $pdo->prepare("INSERT INTO {$queryVote} (num_match, num_vote) VALUES (?,?)") or exit(print_r($pdo->errorInfo()));
        $reqVote->execute(array($numMatch,$numVote));

        echo $queryVote." pris en compte";
    }

?>