<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

require '../../../../php/ConnexionDb.php';

    $matchs = array();

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $reqMatch = $pdo->prepare('SELECT * FROM matchs ORDER BY date_match');
    $reqMatch->execute();
    while($ligne = $reqMatch->fetch(PDO::FETCH_ASSOC)) {
        array_push($matchs, $ligne);
    }

    $myJSON = json_encode($matchs);

    echo $myJSON;

?>

    