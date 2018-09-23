<?php

    $pdo = new PDO('mysql:host=localhost; dbname=talence_volley', 'root', 'jordan');
            $pdo->query('SET NAMES UTF8');

            

            $req = $pdo->prepare("INSERT INTO joueurs (nom) VALUES (:nom)") or exit(print_r($pdo->errorInfo()));
            

            $nom = "buchannon";
            $req->bindParam(':nom', $nom, PDO::PARAM_STR);
            $req->execute();

            ?>