<?php

    require 'Match.php';

    $pdo = new PDO('mysql:host=localhost;dbname=talence_volley', 'root', 'jordan');
    $pdo->query('SET NAMES UTF8');

    $req = $pdo->prepare('SELECT * FROM joueurs');
    $req->execute();

    while($row = $req->fetch()){
        $balise = new Match($row['id'], $row['nom']);
        $balise->afficherMatch();
    }

?>