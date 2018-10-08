<?php
    require 'ConnexionDb.php';
    require 'Match.php';
    require 'Joueur.php';
    require 'Presence.php';

    echo '<div id="listeMatchs" class="container listeMatchs">
            <div class="row">';

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

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
        $presence = new Presence($row['id'], $row['num_match'], $row['num_joueur'],$row['present']);
        array_push($presences, $presence);
    }

    //Création et affichade des matchs
    while($row = $reqMatch->fetch()){
        $strJour = strtotime($row['date_match']);
        $jour = date("d-m-Y", $strJour);
        $balise = new Match($row['id'], $row['nom'], $row['adresse'], $jour);
        $balise->afficherMatch();

        //Affichage des joueurs
        echo '<div id="joueurs'.$balise->getId().'" class="container joueurs">';
        
        //Pour chaque élément de presence, si l'élément de num_Match = numMatch
        foreach($presences as $element) {
            
            if($element->getNumMatch() == $balise->getId()) {
            
                /* echo ' joueur present match : '.$element->getNumMatch();
                echo 'joueur present num: '.$element->getNumJoueur();            
                echo ' joueur present present : '.$element->getPresent();
                echo ' balise id : '.$balise->getId(); */
                            
                //Pour chaque joueur du tableau joueurs
                //si le num de joueur de l'élément correspond à une id de joueur on l'affiche
                foreach($joueurs as $joueur) {
                    if($joueur->getId() == $element->getNumJoueur()){
                        
                        $joueurPresent = $element->getPresent();
                        $joueurId = $element->getId();
                        $numMatch = $element->getNumMatch();

                        $joueur->afficherJoueur($joueurPresent,$joueurId,$numMatch);
                    }
                        
                }
            }
        }
        
        //fin de la div des joueurs
        echo '</div>';
        //fin du container match
        echo '</div>';
        //fin de la div col etc.. 
        echo '</div>';
        
    }
            
        //fin de row
        //fin de listeDesMatchs
    echo '</div>    
        </div>';
?>