<?php

ini_set('display_errors','on');
error_reporting(E_ALL);

    //require 'php/class/Vote.php';
    //require 'php/Joueur.php';
    //require 'php/ConnexionDb.php';
    
    //include 'php/Joueur.php';
    echo "<h1>Ok</h1>";
    

    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $req = $pdo->prepare("SELECT * FROM joueurs");
    $req->execute();

    $joueurs = array();

    try{
    while($row = $req->fetch()) {
        $joueur = new Joueur($row['id'], $row['nom']);
        array_push($joueurs, $joueur);
    }
}
catch(Exception $e) {
    print_r($e->getMessage());
}

    //affichage des joueurs sauf celui de l'ID
    //Un joueur ne peut pas voter pour lui-même

    echo '<div id="votes" class="container">';

        foreach($joueurs as $joueur) {
            $joueur->afficherVote();
        }

    echo '</div>';


?>