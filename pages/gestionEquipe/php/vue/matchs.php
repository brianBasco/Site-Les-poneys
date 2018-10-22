<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

require '../classes/Match.php';
require '../../../../php/ConnexionDb.php';

 //affichage de chaque match trouvé dans la bdd
 $pdo = new PDO(MYSQL, USER, PSWD);
 $pdo->query("SET NAMES UTF8");

    $matchs = array();
    $presences = array();

    $reqPresence = $pdo->prepare('SELECT * FROM presence');
    $reqPresence->execute();
    while($ligne = $reqPresence->fetch(PDO::FETCH_ASSOC)) {
        array_push($presences, $ligne);
    }   

    $reqMatch = $pdo->prepare('SELECT * FROM matchs ORDER BY date_match');
    $reqMatch->execute();
    while($ligne = $reqMatch->fetch(PDO::FETCH_ASSOC)) {
        array_push($matchs, $ligne);
    }

    $objMatchs = array();

    foreach($matchs as $unMatch) {
        $liste = array();
    //construction des joueurs par match
    //pour chaque presence, si le numero de match correspond, pousse dans un tableau
    //ce tableau final est poussé comme liste des joueurs
    foreach($presences as $unJoueur) {
        
        if((int)$unJoueur['num_match'] == (int)$unMatch['id']) array_push($liste, $unJoueur);
    }
    $unMatch = new Match($unMatch['id'], $unMatch['nom'], $liste);
    array_push($objMatchs, $unMatch);
    }

    $myJSON = json_encode($objMatchs);

    echo $myJSON;

?>

    