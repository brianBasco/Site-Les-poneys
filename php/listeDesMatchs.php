<?php
    require 'Match.php';

    echo '<div id="listeMatchs" class="container listeMatchs">';

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO('mysql:host=localhost;dbname=talence_volley', 'root', 'jordan');
    $pdo->query('SET NAMES UTF8');

    $req = $pdo->prepare('SELECT * FROM matchs');
    $req->execute();

    while($row = $req->fetch()){
        $balise = new Match($row['id'], $row['nom'], $row['adresse'], $row['date_match']);
        $balise->afficherMatch();
    }

    echo
        '<div id="insertionMatch"></div>
        </div>';

?>