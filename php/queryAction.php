<?php
ini_set('display_errors', true);
error_reporting (E_ALL);

extract($_GET);

require 'ConnexionDb.php';

    //affichage de chaque match trouvé dans la bdd
    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $votes = array();
    $joueurs = array();

    //Tableau de type ((photo1,nbre de votes),(photo2,nbre de votes))
    $reponse = array();

    $reqVotes = $pdo->prepare("SELECT * FROM VoteAction WHERE num_match = ?");
    $reqVotes->execute(array($num_match));
    while($ligne = $reqVotes->fetch(PDO::FETCH_ASSOC)) {
        array_push($votes, $ligne);
    }

    $reqJoueurs = $pdo->prepare("SELECT id, photo FROM joueurs");
    $reqJoueurs->execute();
    while($ligne = $reqJoueurs->fetch(PDO::FETCH_ASSOC)) {
        array_push($joueurs, $ligne);
    }

    //Pour chaque joueur, on compte le nombre de votes et ajout dans le tableau réponse
    foreach($joueurs as $joueur) {
        //compteur du nombre de votes
        $i = 0;
        foreach($votes as $vote) {
            if($joueur["id"] == $vote["num_vote"]) $i++;
        }
        if($i != 0)  {
            $unVote = array($joueur["photo"], $i);
            array_push($reponse, $unVote);
        }            
    }

    $reponse = trierTableau($reponse);
    //$reponse = trierTableau($reponse);    

    $myJSON = json_encode($reponse);
    echo $myJSON;

    //Tri du tableau final par nombre de votes
    function trierTableau($tab) {

        //tri par maximum
        if(sizeof($tab) != 0) { 

            //i = curseur de départ 
            for($i = 0; $i<sizeof($tab); $i++) {
               
                $max = $tab[$i][1];

                 //j = curseur d'itéraion de i(1,2,3 etc)
                 for($j = $i+1; $j<sizeOf($tab); $j++) {
                    if($max < $tab[$j][1]) {

                        $max = $tab[$j][1];
                        //échange de cases dans le tableau
                        
                        $tmp = $tab[$i];
                        $tab[$i] = $tab[$j];
                        $tab[$j] = $tmp;
                    }
                } 

               
                }
            }
            return $tab;
    }

?>