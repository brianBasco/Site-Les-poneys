<?php

//$destinataires = $_GET('destinataires');
ini_set( 'display_errors', 1 );
 
error_reporting( E_ALL );

require '../../../php/FooterMail.php';

extract($_GET);

$sujet = $entete;

$message = '<p>'.$contenu.'</p><br>'.FOOTERMAIL;

$headers = 'From: grandchef@poneysdetalence.fr' . "\r\n" .
     'Content-type:text/html;charset=UTF-8'. "\r\n" .
     'X-Mailer: PHP/' . phpversion();
 

//=====Envoi de l'e-mail.

$retour = mail($destinataires,$sujet,$message,$headers);

if($retour) echo "Mail envoyé";
else echo "Echec de l'envoi";

//==========

?>

