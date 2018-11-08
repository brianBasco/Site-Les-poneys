<?php

ini_set('display_errors', true);
error_reporting (E_ALL);

//Toutes les clés du get sont mises dans un tableau cles
$cles = array();
foreach ($_GET as $cle) {
    array_push($cles, $cle);
}

extract($_GET);

//require '../classes/Match.php';
require '../../../php/ConnexionDb.php';

 //affichage de chaque match trouvé dans la bdd
 $pdo = new PDO(MYSQL, USER, PSWD);
 $pdo->query("SET NAMES UTF8");

 $match = null;

    $reqMatch = $pdo->prepare('SELECT * FROM matchs WHERE id=(?)');
    $reqMatch->execute(array($num_match));
    while($ligne = $reqMatch->fetch(PDO::FETCH_ASSOC)) {
        $match = $ligne;
    }

//charge les infos du match d'après la bdd
//Comparaison avec les donées du GET
foreach($cles as $cle) {
    echo "cle : ".$cle.'<br/>';
    echo "matchcle : ".$match[$cle];
    if($cle != $match[$cle]) {
        //Update de la db là où il y a des différences
        
    }
}




//Enregistrement des scores dans la table scores
//Si le numéro de match n'existe pas dans la table scores query = insert
//sinon query = update


?>