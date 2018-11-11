<?php

ini_set('display_errors', true);
error_reporting (E_ALL);

//require '../classes/Match.php';
require '../../../php/ConnexionDb.php';

 //affichage de chaque match trouvé dans la bdd
 $pdo = new PDO(MYSQL, USER, PSWD);
 $pdo->query("SET NAMES UTF8");

    $scores = array();

    $reqScores = $pdo->prepare('SELECT * FROM scores');
    $reqScores->execute();
    while($ligne = $reqScores->fetch(PDO::FETCH_ASSOC)) {
        array_push($scores, $ligne);
    }
   

    $myJSON = json_encode($scores);

    echo $myJSON;

?>