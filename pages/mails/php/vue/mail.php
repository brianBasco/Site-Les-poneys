<?php

    echo '
            <div class="mail container">
            
        <div class="input-group enTete">
            <input id="entete" class="form-control" type="text" value="match contre '.$nomMatch.'" />
        </div>

        
        <div class="input-group corps">
            <textarea id="email" rows="8" class="form-control" aria-label="votre mail" type="text" 
            placeholder="votre mail"></textarea>
        </div>

        <button id="envoyerMail" class="btn btn-success">envoyer</button>

        
        </div>';
?>