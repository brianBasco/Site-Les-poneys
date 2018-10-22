<?php
    require '../../php/ConnexionDb.php';    

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    //Récupération de la liste des joueurs de la bdd et insertion dans un tableau
    $reqJoueurs = $pdo->prepare('SELECT * FROM joueurs');
    $reqJoueurs->execute();
    $joueurs = array();
    while($row = $reqJoueurs->fetch()) {
        array_push($joueurs, $row);
    }
?>

    