<!DOCTYPE html>

<html style="height: 100%">

    <head>
        <title>NFA017 - authentification</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <meta name="viewport" content="width=device-width, initial-scale=1" /> 
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        
    </head>

    <body class="authentification" >
        <form method="POST" action="#">          
            <fieldset>
                <legend>Connexion</legend>

                <div>
                    <label for="mdp">Mot de passe</label>
                    <input type="password" name="mdp" id="mdp" placeholder="Votre mot de passe"/>
                </div>

                <div>
                    <label></label> <!-- label vide pour aligner le bouton ci-dessous -->
                    <input class="bouton" type="submit" name="submit" value="Valider" />
                </div>

            </fieldset>
                  
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