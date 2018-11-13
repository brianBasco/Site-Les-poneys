<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

require 'ConnexionDb.php';

$scores = array();


    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $reqScores = $pdo->prepare("SELECT * FROM scores, matchs WHERE scores.num_match = matchs.id ORDER BY date_match DESC");
    $reqScores->execute();
    while($ligne = $reqScores->fetch(PDO::FETCH_ASSOC)) {
        array_push($scores, $ligne);
    }
   
    $myJSON = json_encode($scores);
    echo $myJSON;
?>