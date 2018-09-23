<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="caisse">

    <!-- mettre une icone de caisse -->
    <link rel="icon" href="#">

    <title>TALENCE</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/style.css" rel="stylesheet">

    <script type="text/javascript" src="ajax_utils.js"></script>
    <script type="text/javascript" src="script.js"></script>
  </head>

<body>


    <h1>Le grand test</h1>
    
    <form method="POST" action="#">          
        <input type="submit" name="submit" value="Valider" />
    </form>

    <button id="test">Mitch Buchannon</button>

    <div id="reponse"></div>
        
        <?php

        try {
        
        if(isset($_POST['submit'])){
            // Modif de la bdd
            $pdo = new PDO('mysql:host=localhost; dbname=talence_volley', 'root', 'jordan');
            $pdo->query('SET NAMES UTF8');

            echo
            '<div>
                <p>ca merde pas encore</p>
            </div>';

            $req = $pdo->prepare("INSERT INTO joueurs (nom) VALUES (:nom)") or exit(print_r($pdo->errorInfo()));
            echo
            '<div>
                <p>ca merde pas encore</p>
            </div>';

            $nom = "mitch";
            $req->bindParam(':nom', $nom, PDO::PARAM_STR);

            

            $req->execute();
            
            echo
                '<div>
                    <p>Mitch a bien été ajouté</p>
                </div>';
                
            } 
        }
            
            catch(PDOException $e){
                die('Erreur : '. $e->getMessage());
            }
        ?>


       
    </body>
</html>