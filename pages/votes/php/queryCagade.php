<?php

require '../../../php/ConnexionDb.php';

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $votes = array();

    $reqVotes = $pdo->prepare("SELECT * FROM VoteCagade");
    $reqVotes->execute();
    while($ligne = $reqVotes->fetch(PDO::FETCH_ASSOC)) {
        array_push($votes, $ligne);
    }

    $myJSON = json_encode($votes);
    echo $myJSON;

?>