<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

require '../../../php/ConnexionDb.php';
require 'Match.php';

//$matchs est un tableau contenant des objets Match(id, nom, date, action, cagade)
    $matchs = array();
    $unMatch = array();

    
    

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

   /*  $reqMatchs = $pdo->prepare("SELECT num_match FROM VoteAction GROUP BY num_match");
    $reqMatchs->execute();
    while($ligne = $reqMatchs->fetch(PDO::FETCH_ASSOC)) {
        array_push($matchs, $ligne);
    }

    foreach($matchs as $match) {
        $votes = array();
        $reqVote = $pdo->prepare("SELECT num_vote FROM VoteAction WHERE num_match = (?) GROUP BY num_vote");
        $reqVote->execute(array($match['num_match']));
        while($ligne = $reqVote->fetch(PDO::FETCH_ASSOC)) {

            array_push($votes, $ligne);
        }
        array_push($unMatch, $votes);
    }
 */
   
    $reqMatchs = $pdo->prepare("SELECT * FROM matchs");
    $reqMatchs->execute();
    while($ligne = $reqMatchs->fetch(PDO::FETCH_ASSOC)) {
        $match = new Match($ligne['id'],$ligne['nom'], $ligne['date_match']);
        array_push($matchs, $match);
    }


    $reqVotes = $pdo->prepare("SELECT * FROM VoteAction");
    $reqVotes->execute();
    while($ligne = $reqVotes->fetch(PDO::FETCH_ASSOC)) {
        array_push($votes, $ligne);
    }

    print_r($votes);

    foreach($matchs as $match) {
        $id = $match->get_id();
        foreach($votes as $vote) {
            
            if($vote['num_match'] == $id) {
                echo "vote =  ".$vote['num_match'];                
                $tab = $match->get_action();                
                array_push($tab, $vote['num_vote']);                
                $match->set_action($tab);
                print_r($match->get_action());
            }
        }
    }
    //créer une classe match comme ça :
    /* match {

            id;
            nom;
            voteAction: tab[vote1, vote2, etc]
            voteCagade: tab[vote1, vote2, etc]
    }

    créer les recoupements en javascript avec les noms, photos des joueurs et calcul
    nombre de vote(tab.length), count max
     */

    foreach($matchs as $match) {
        echo "nom = " .$match->get_nom();
        echo "action = " .print_r($match->get_action());
    }

    $votes = array();

    $reqVotes = $pdo->prepare("SELECT * FROM VoteAction");
    $reqVotes->execute();
    while($ligne = $reqVotes->fetch(PDO::FETCH_ASSOC)) {
        array_push($votes, $ligne);
    }

    $myJSON = json_encode($votes);
    echo $myJSON;

?>