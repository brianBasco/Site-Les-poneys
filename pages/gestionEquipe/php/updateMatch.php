<?php

ini_set('display_errors', true);
error_reporting (E_ALL);

//Toutes les clés du get sont mises dans un tableau cles
$cles = array();
foreach ($_GET as $cle => $valeur) {
    array_push($cles, array($cle,$valeur));
}


var_dump($_GET);

var_dump($cles);

extract($_GET);

//require '../classes/Match.php';
require '../../../php/ConnexionDb.php';

 //affichage de chaque match trouvé dans la bdd
 $pdo = new PDO(MYSQL, USER, PSWD);
 $pdo->query("SET NAMES UTF8");


for($i = 1; $i<sizeof($cles); $i++) {
    $uneCle = $cles[$i][0];
    $reqMatch = $pdo->prepare("UPDATE matchs SET {$uneCle} = (?) WHERE id=(?)");    
    $reqMatch->execute(array($cles[$i][1],$id)) or exit(print_r($reqMatch->errorInfo()));
}

echo "match mis à jour";

?>