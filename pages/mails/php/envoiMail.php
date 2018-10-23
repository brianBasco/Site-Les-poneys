<?php

//$destinataires = $_GET('destinataires');
ini_set( 'display_errors', 1 );
 
error_reporting( E_ALL );

extract($_GET);

echo $destinataires;
echo $entete;
echo $contenu;

$mail = 'bast620@gmail.com'; // Déclaration de l'adresse de destination.

$sujet = "mon Test";

$message = '<p>'.$contenu.'</p><br>
            <div style="position: fixed;bottom: 0; text-align:center">
            <p>Mail envoyé de votre site préféré www.poneysdetalence.fr</p>
            <p>Pas la peine de cliquer <a href="www.poneysdetalence.fr">ici</a>. Vous ne pouvez pas vous désabonner.<br>
            reproduction interdite sous peine de mort</p>
            </div>';

$headers = 'From: grandchef@poneysdetalence.fr' . "\r\n" .
     'Content-type:text/html;charset=UTF-8'. "\r\n" .
     'X-Mailer: PHP/' . phpversion();
 

//=====Envoi de l'e-mail.

$retour = mail($destinataires,$sujet,$message,$headers);
var_dump($retour);

//==========

?>

