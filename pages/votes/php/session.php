<?php
	session_start();
	//Si l'utilisateur n'a pas ouvert de session il est redirigé vers le formulaire
	// d'authentification
    if(!$_SESSION['connecte']){
       header("Location: ../../authentification.php");
       exit();
    }

?>