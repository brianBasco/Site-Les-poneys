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

        <div class="form-group col-lg-6">
            <input id="envoyerMail" type="submit" class="btn btn-form btn-outline-success" value="envoyer" name="envoyer" />
        </div>

        <div class="form-group col-lg-6">
            <input id="reset" type="reset" class="btn btn-form btn-outline-warning" value="reset" />
        </div>

        <div class="form-group col-lg-6">
            <button class="btn btn-form btn-outline-danger" id="annuler">Retour</button>
        </div>
        
        </div>';
?>