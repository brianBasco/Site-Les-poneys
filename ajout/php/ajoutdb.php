<?php

// A FAIRE !!!!! VERIFIER INPUT VIDES !!!!!!!!! 
//ATTENTION aux espaces vides


header('location:../../index.php');
extract($_POST);

//ajout du match dans la bdd

//ajout de la présence des joueurs à 0 dans la bdd
// 0 = absent, 1 = présent

$pdo = new PDO('mysql:host=localhost;dbname=talence_volley', 'root', 'jordan');
$pdo->query('SET NAMES UTF8');

//insertion du match
try {
    $req = $pdo->prepare("INSERT INTO matchs (nom, adresse, date_match) VALUES (?,?,?)") or exit(print_r($req->ErrorInfo()));
    $req->execute(array($nom, $adresse, $date));
}
catch(PDOException $e) {
    print_r($e->getMessage());
}

//Récupération du numéro de match
$reqNumMatch = $pdo->prepare("SELECT MAX(id) FROM matchs ");
$reqNumMatch->execute();
$numMatch = (int)$reqNumMatch->fetch()[0];


//insertion de la présence des joueurs
$reqJoueurs = $pdo->prepare("SELECT id FROM joueurs");
$reqJoueurs->execute();
$presence = 0;
while($ligne = $reqJoueurs->fetch()){
    print_r( $ligne);
    $req = $pdo->prepare("INSERT INTO presence (num_match, num_joueur, present) VALUES (?,?,?)") or exit(print_r($req->ErrorInfo()));
    $req->execute(array($numMatch,(int)$ligne['id'], $presence));
}

?>