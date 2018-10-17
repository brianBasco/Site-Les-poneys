<!DOCTYPE html>

<html style="height: 100%">

    <head>
        <title>authentification</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:700" rel="stylesheet"> 
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        
    </head>

    <body class="authentification" >

    <img class="image" src="css/images/volley-silhouette.png" >
    
        <form class="form" method="POST" action="#">          
            
                <div>
                    <input type="password" name="mdp" id="mdp" placeholder="Votre mot de passe"/>
                    <input class="bouton" type="submit" name="submit" value="Valider" />
                </div>
                  
        </form>
        
        <?php
        session_start();
        if(isset($_POST['submit'])){

            // Si les champs sont remplis je teste si le login et le mot de passe sont valides
            
            $_SESSION['mdp'] = $_POST['mdp'];
            //Si c'est ok je crée un booléen qui me dit que la session est ouverte et validée
            if(verif_connexion($_SESSION['mdp'])){
                $_SESSION['connecte'] = true;
                    header("Location: index.php");
                    exit();
            }
            //Sinon la session est ouverte mais le booléen en restant à False ne permet pas l'accès
            // aux pages protégées
            else {
                $_SESSION['connecte'] = false;    
                echo '<div class="reponse">
                        <p>Le mot de passe n\'est pas valide</p>
                    </div>';
                
            }                
        }
    
    function verif_connexion($mdp) {
        //comparaison du login et mdp avec le base de données
        $pdo = new PDO('mysql:host=localhost; dbname=connexionPoneys', 'root', 'jordan');
        $pdo->query('SET NAMES UTF8');
       
        $reponse = $pdo->prepare("SELECT * FROM connexion")or exit(print_r($pdo->errorInfo()));
        $reponse->execute();
        while($rep = $reponse->fetch(PDO::FETCH_ASSOC)){
            if($rep['mdp'] == $mdp) return true;
        }
        return false;
    }
        ?>

        </div>

      

</body>
</html>