<?php
     include('php/gestion.php');

     echo '<div id="listeJoueurs" class="container listeJoueurs">';

    foreach($joueurs as $unJoueur) {
        echo '
        <div class="form-group">
        <input class="form-control" readonly type="text" value="'.$unJoueur['nom'].'" />
        <input class="form-control"  readonly type="text" value="'.$unJoueur['mail'].'" />
        <img class="photo" src="../../css/images/joueurs/'.$unJoueur["photo"].'" />
        <button class="btn btn-alert" title="supprimmer">X</button>
        <button class="btn btn-success" title="modifier">enregistrer</button>';
    }

    echo '</div>';
?>