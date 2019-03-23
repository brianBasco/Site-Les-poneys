<?php

// A FAIRE !!!!! VERIFIER INPUT VIDES !!!!!!!!! 
//ATTENTION aux espaces vides


header('location:../../../index.php');
extract($_POST);

//ajout du match dans la bdd

//ajout de la présence des joueurs à 0 dans la bdd
// 0 = absent, 1 = présent

//require des constantes
require '../../../php/TabDesJours.php';
require '../../../php/FooterMail.php';
require '../../../php/ConnexionDb.php';
$pdo = new PDO(MYSQL, USER, PSWD);
$pdo->query("SET NAMES UTF8");

//insertion du match
try {
    $req = $pdo->prepare("INSERT INTO matchs (nom, adresse, date_match, heure) VALUES (?,?,?,?)") or exit(print_r($req->ErrorInfo()));
    $req->execute(array($nom, $adresse, $date, $heure));
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
$a_vote = 0;
while($ligne = $reqJoueurs->fetch()){
    $req = $pdo->prepare("INSERT INTO presence (num_match, num_joueur, present, VoteAction, VoteCagade) VALUES (?,?,?,?,?)") or exit(print_r($req->ErrorInfo()));
    $req->execute(array($numMatch,(int)$ligne['id'], $presence, $a_vote, $a_vote));
}

//envoi du mail à tous
$destinataires = array();
$reqDest = $pdo->prepare("SELECT mail FROM joueurs");
$reqDest->execute();
while($res = $reqDest->fetch()){
    array_push($destinataires, $res['mail']); 
}
// Déclaration de l'adresse de destination.
$destinataires = implode(",",$destinataires);

//affichage de la Date au format fr
$strJour = strtotime($date);
$jour = date("d-m-Y", $strJour);

// N - The ISO-8601 numeric representation of a day (1 for Monday, 7 for Sunday)
$jourSemaine = TABDESJOURS[(date("N", $strJour)-1)];

$sujet = "ajout de match";

$message = "un match contre {$nom} le {$jourSemaine} {$jour} à {$heure} se jouera à {$adresse}".FOOTERMAIL;

$headers = 'From: grandchef@poneysdetalence.fr' . "\r\n" .
     'Content-type:text/plain;charset=UTF-8'. "\r\n" .
     'X-Mailer: PHP/' . phpversion();
 

//=====Envoi de l'e-mail.

$retour = mail($destinataires,$sujet,$message,$headers);

?>