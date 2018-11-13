<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

require '../../../php/ConnexionDb.php';

    $matchs = array();
    $unMatch = array();

    $votes = array();
    

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
        array_push($matchs, $ligne);
    }


    $reqVotes = $pdo->prepare("SELECT * FROM VoteAction GROUP BY num_match");
    $reqVotes->execute();
    while($ligne = $reqVotes->fetch(PDO::FETCH_ASSOC)) {
        array_push($votes, $ligne);
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

    /* foreach($matchs as $match) {
        array_push($res, $match);
        foreach($votes as $vote) {
            if($vote['num_match'] == $match['id']) array_push
        }
    } */

   
    $myJSON = json_encode($unMatch);
    echo $myJSON;

    //print_r($votes);

?>