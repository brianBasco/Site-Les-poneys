<?php

    $match = (int) $_GET['match'];

    require '../../php/ConnexionDb.php';    

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    //Récupération de la liste des joueurs de la bdd et insertion dans un tableau
    $reqJoueurs = $pdo->prepare('SELECT nom, mail, present FROM joueurs, presence WHERE num_match = (?) AND
    num_joueur = joueurs.id');
    $reqJoueurs->execute(array($match));
    $joueurs = array();
    while($row = $reqJoueurs->fetch()) {
        array_push($joueurs, $row);
    }


    $reqMatch = $pdo->prepare('SELECT nom FROM matchs WHERE id = (?)');
    $reqMatch->execute(array($match));
    while($row = $reqMatch->fetch()) {
        $nomMatch = $row['nom'];
    }
?>