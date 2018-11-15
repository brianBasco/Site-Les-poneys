<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

require '../../../php/ConnexionDb.php';

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $joueurs = array();

    $reqjoueurs = $pdo->prepare("SELECT * FROM joueurs");
    $reqjoueurs->execute();
    while($ligne = $reqjoueurs->fetch(PDO::FETCH_ASSOC)) {
        array_push($joueurs, $ligne);
    }

    $myJSON = json_encode($joueurs);
    echo $myJSON;

?>