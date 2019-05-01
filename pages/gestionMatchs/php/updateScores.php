<?php

//ini_set('display_errors', true);
//error_reporting (E_ALL);

extract($_GET);
//variables du get : id, nous, eux
//nous et eux sont nécessairement différents de null
$id = (int)$id;
$nous = (int)$nous;
$eux = (int)$eux;

$retour = "scores enregistrés";

//require '../classes/Match.php';
require '../../../php/ConnexionDb.php';

 //affichage de chaque match trouvé dans la bdd
 $pdo = new PDO(MYSQL, USER, PSWD);
 $pdo->query("SET NAMES UTF8");


$reqMatchs = $pdo->prepare('SELECT * FROM scores');
$reqMatchs->execute();
// $res récupère si le match est déjà enregistré dans les scores 
$res = null;
while($ligne = $reqMatchs->fetch(PDO::FETCH_ASSOC)) {
    if($ligne["num_match"] == $id) $res = $ligne["id"];
}


//si res n'est pas nul, le match est déjà crée, donc update du match
if($res != null) {

    try {
        $reqUpdate = $pdo->prepare('UPDATE scores SET nous = (?), eux = (?) WHERE id=(?)');
        $reqUpdate->execute(array($nous, $eux, $id)) or exit($retour = "Pb update");
    }
    catch(Exception $e) {
        $retour = $e->getMessage();
    }
}

//sinon, le match n'a pas été crée, insert into scores
else {

    try {
        $reqInsert = $pdo->prepare('INSERT INTO scores (num_match,nous,eux) VALUES (?,?,?)');
        $reqInsert->execute(array($id, $nous, $eux)) or exit($retour = "Pb Insert");
    }
    catch(Exception $e) {
        $retour = $e->getMessage();
    }
}

echo $retour;

?>