<?php

    echo '<h1>Bienvenue dans le débug</h1>';
    

    $numMatch = (int)$_GET['match'];
    $numJoueur = (int)$_GET['joueur'];
    $presence = (int)$_GET['presence'];

    echo 'numMatch = '.$_GET['match'];

    $pdo = new PDO('mysql:host=localhost; dbname=talence_volley', 'root', 'jordan');
            $pdo->query('SET NAMES UTF8');

            

            //$req = $pdo->prepare("INSERT INTO joueurs (nom) VALUES (:nom)") or exit(print_r($pdo->errorInfo()));
            //$req = $pdo->query("UPDATE matchs SET adresse='adresse de test' WHERE id =".$numMatch) or exit(print_r($pdo->errorInfo()));

            //update de la bdd, à chaque match créé la table presence doit être initialisée avec 0
            $req = $pdo->prepare("UPDATE presence SET present=(?) WHERE num_Match =".$numMatch." AND num_Joueur=".$numJoueur) or exit(print_r($pdo->errorInfo()));
            $req->execute(array($presence));

            $nom = "buchannon";
            //$req->bindParam(':nom', $nom, PDO::PARAM_STR);
            //$req->bindParam(':id', $numMatch);
            //$req->execute();

            ?>