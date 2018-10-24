<?php

ini_set('display_errors', true);
error_reporting (E_ALL);

    require 'FooterMail.php';
    require 'ConnexionDb.php';

    $ligne = (int)$_GET['ligne'];
    $presence = (int)$_GET['presence'];
    
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    //update de la bdd, à chaque match créé la table presence doit être initialisée avec 0
    $req = $pdo->prepare("UPDATE presence SET present=(?) WHERE id=(?)") or exit(print_r($pdo->errorInfo()));
    $req->execute(array($presence,$ligne));

    //recupération des infos du joueur et du match pour envoi mail d'information
    $reqInfos = $pdo->prepare("SELECT * FROM presence WHERE id=(?)") or exit(print_r($pdo->errorInfo()));
    $reqInfos->execute(array($ligne));
    $num_joueur;
    $num_match;
    while($res = $reqInfos->fetch()) {
        $num_joueur = $res['num_joueur'];
        $num_match = $res['num_match'];
    }

    $reqJoueur = $pdo->prepare("SELECT nom FROM joueurs WHERE id=(?)") or exit(print_r($pdo->errorInfo()));
    $reqJoueur->execute(array($num_joueur));
    $nom_joueur;
    while($res = $reqJoueur->fetch()) {
        $nom_joueur = $res['nom'];
    }

    $reqMatch = $pdo->prepare("SELECT * FROM matchs WHERE id=(?)") or exit(print_r($pdo->errorInfo()));
    $reqMatch->execute(array($num_match));
    $nom_match;
    $date_match;
    while($res = $reqMatch->fetch()) {
        $nom_match = $res['nom'];
        $date_match = $res['date_match'];
        $date_match = strtotime($date_match);
        $date_match = date("d-m-Y", $date_match);
    }

    //=====Envoi de l'e-mail.
    $present;
    switch($presence) {
        case 1: 
            $present = "présent";
            break;
        case 2:
            $present = "à la bourre";
            break;
        case 3:
            $present = "absent";
            break;
        case 4:
            $present = "incertain";
            break;
    }

    $nomDest = "marie";
    $reqDest = $pdo->prepare("SELECT mail FROM joueurs WHERE nom=(?)");
    $reqDest->execute(array($nomDest));
    $destinataires;
    while($res = $reqDest->fetch()){
        $destinataires = $res['mail']; 
    }

    $sujet = "Inscritption de {$nom_joueur}";

    $message = "<p>{$nom_joueur} s'est inscrit pour le match contre {$nom_match} du {$date_match}<br>
                A voté {$present}</p><br>".FOOTERMAIL;

    $headers = 'From: grandchef@poneysdetalence.fr' . "\r\n" .
     'Content-type:text/html;charset=UTF-8'. "\r\n" .
     'X-Mailer: PHP/' . phpversion();

    mail($destinataires,$sujet,$message,$headers);

    $retour =  json_encode(array(true,"présence mise à jour"));
    echo $retour;

?>