<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

require '../../../../php/ConnexionDb.php';

 //affichage de chaque match trouvé dans la bdd
 $pdo = new PDO(MYSQL, USER, PSWD);
 $pdo->query("SET NAMES UTF8");

    $joueurs = array();

    $reqJoueurs = $pdo->prepare('SELECT * FROM joueurs');
    $reqJoueurs->execute();
    while($ligne = $reqJoueurs->fetch(PDO::FETCH_ASSOC)) {
        array_push($joueurs, $ligne);
    }
    
    $json = json_encode($joueurs);

    echo $json;

    ?>
