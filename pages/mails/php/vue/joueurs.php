<?php
    
     echo '
            <div id="listeJoueurs" class="container listeJoueurs">
            <div class="row">';
            

    foreach($joueurs as $unJoueur) {
        echo '
        <div class="joueur col-12 col-sm-6 col-lg-4">
            
            <label class="switch">
                <input data-present="'.$unJoueur['present'].'" type="checkbox" class="querySelect" value="'.$unJoueur['mail'].'" />                
                <span class="slider selected">'.$unJoueur['nom'].'</span>
            </label>
            
        </div>';
    }

    echo '</div>';
    echo '</div>';

    echo '
        <div class="container choix">
        <button id="tous" class="btn btn-success" >Envoyer un mail à tous</button>
        <button id="presents" class="btn btn-danger" >Envoyer un mail aux présents</button>
        </div>
        ';
?>