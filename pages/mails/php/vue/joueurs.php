<?php
    
     echo '<div id="listeJoueurs" class="container listeJoueurs">
     
     <button class="btn btn-success" >Envoyer un mail à tous</button>
     <button class="btn btn-danger" >Envoyer un mail aux présents</button>
     <button class="btn btn-primary" >Sélectionner</button>';

    foreach($joueurs as $unJoueur) {
        echo '
        <div class="form-group">
        <input class="form-control"  readonly type="text" value="'.$unJoueur['nom'].'" />
        <input class="form-control" readonly type="text" value="'.$unJoueur['mail'].'" />
        <input class="form-control"  readonly type="text" value="'.$unJoueur['present'].'" />
        <button class="btn btn-alert" title="supprimmer">X</button>
        <button class="btn btn-success" title="modifier">enregistrer</button>';
    }

    echo '</div>';
?>