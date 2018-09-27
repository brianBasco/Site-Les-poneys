<?php
    require 'Match.php';
    require 'Joueur.php';
    require 'Presence.php';

    echo '<div id="listeMatchs" class="container listeMatchs">';

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO('mysql:host=localhost;dbname=talence_volley', 'root', 'jordan');
    $pdo->query('SET NAMES UTF8');

    $reqMatch = $pdo->prepare('SELECT * FROM matchs');
    $reqMatch->execute();

    //Récupération de la liste des joueurs de la bdd et insertion dans un tableau
    $reqJoueurs = $pdo->prepare('SELECT * FROM joueurs');
    $reqJoueurs->execute();
    $joueurs = array();
    while($row = $reqJoueurs->fetch()) {
        $joueur = new Joueur($row['id'], $row['nom']);
        array_push($joueurs, $joueur);
    }

    //Récupération des présences de la bdd et insertion dans un tableau
    $reqPresence = $pdo->prepare('SELECT * FROM presence');
    $reqPresence->execute();
    $presences = array();
    while($row = $reqPresence->fetch()) {
        $presence = new Presence($row['num_match'], $row['num_joueur'],$row['present']);
        array_push($presences, $presence);
    }

    //Création et affichade des matchs
    while($row = $reqMatch->fetch()){
        $balise = new Match($row['id'], $row['nom'], $row['adresse'], $row['date_match']);
        $balise->afficherMatch();

        //Affichage des joueurs
        echo '<div id="joueurs'.$balise->getId().'" class="container joueurs">';
        for($i = 0; $i<sizeof($joueurs); $i++) {

            $joueurPresent = $presences[$i];
            
            echo 'joueur present num: '.$joueurPresent->getNumJoueur();
            echo 'joueur present match : '.$joueurPresent->getNumMatch();
            echo 'joueur present present : '.$joueurPresent->getPresent();
            echo 'joueurs[i] id : '.$joueurs[$i]->getId();
            echo 'balise id : '.$balise->getId();
            //sécurité de correspondance entre id
            
            if($joueurPresent->getNumJoueur() == $joueurs[$i]->getId() &&
             $joueurPresent->getNumMatch() == $balise->getId()) {
                $joueurs[$i]->afficherJoueur($joueurPresent->getPresent());
             }
             
        }
        echo '</div>';
        
    }

    echo
        '<div id="insertionMatch"></div>
        </div>';

?>