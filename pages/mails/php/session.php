
<?php
/*
	session_start();
	//Si l'utilisateur n'a pas ouvert de session il est redirigé vers le formulaire
	// d'authentification
    if(!$_SESSION['connecte']){
       header("Location: ../../authentification.php");
       exit();
    }
*/
?>

<?php
    session_start();

    //echo $_COOKIE["mdp"];

    /*
    //ancien code   
	//Si l'utilisateur n'a pas ouvert de session il est redirigé vers le formulaire
    // d'authentification
    
    if(!$_SESSION['connecte']){
       header("Location: authentification.php");
       exit();
    }
    */
    
    //variable globale $mdp
    $mdp  = null;

    //récupération du mdp enregistré dans la bdd : 
    require '../../php/ConnexionDb.php';
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");
    
    $reponse = $pdo->prepare("SELECT mdp FROM connexion")or exit(print_r($pdo->errorInfo()));
    $reponse->execute();
    while($rep = $reponse->fetch(PDO::FETCH_ASSOC)){
        //if($rep['mdp'] == $mdp) return true;
        $mdp = $rep['mdp'];
    }

    // Pas besoin de vérifier si le cookie existe
    //vérification du mot de passe et pas de redirection
    //s'il correspond au mdp de la bdd
    
    if($_COOKIE["mdp"] != $mdp) {
        header("Location: authentification.php");
        exit();
    }
    

    

?>