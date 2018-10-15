<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

//require '../php/ConnexionDb.php';
    define("MYSQL","mysql:host=localhost;dbname=talence_volley");
    define("USER","root");
    define("PSWD","jordan");

    $matchs = array();
    $unMatch = array();
    

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $reqMatchs = $pdo->prepare("SELECT num_match FROM votes GROUP BY num_match");
    $reqMatchs->execute();
    while($ligne = $reqMatchs->fetch(PDO::FETCH_ASSOC)) {
        array_push($matchs, $ligne);
    }

    foreach($matchs as $match) {
        $votes = array();
        $reqVote = $pdo->prepare("SELECT num_vote FROM votes WHERE num_match = (?) GROUP BY num_vote");
        $reqVote->execute(array($match['num_match']));
        while($ligne = $reqVote->fetch(PDO::FETCH_ASSOC)) {
            array_push($votes, $ligne);
        }
        array_push($unMatch, $votes);
    }

   

   
    $myJSON = json_encode($unMatch);
    echo $myJSON;

    //print_r($votes);

?>