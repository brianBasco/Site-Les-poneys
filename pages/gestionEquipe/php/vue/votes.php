<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

//require '../php/ConnexionDb.php';
    define("MYSQL","mysql:host=localhost;dbname=talence_volley");
    define("USER","root");
    define("PSWD","jordan");

    $votes = array();

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $reqVote = $pdo->prepare('SELECT * FROM votes');
    $reqVote->execute();
    while($ligne = $reqVote->fetch(PDO::FETCH_ASSOC)) {
        array_push($votes, $ligne);
    }

    $myJSON = json_encode($votes);

    echo $myJSON;

?>