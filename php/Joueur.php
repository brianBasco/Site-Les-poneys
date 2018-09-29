<?php

    class Joueur {

        private $id;
        private $nom;

        public function __construct($id, $nom) {
            $this->id = $id;
            $this->nom = $nom;
        }

        public function getId() {
            return $this->id;
        }

        public function getNom() {
            return $this->nom;
        }

        public function afficherJoueur($presence, $numsql, $numMatch) {
            echo
                '<div class="joueur">
                <label class="nom">'.$this->nom.'</label>
                <label class="switch">';
                if($presence == 1) echo '<input type="checkbox" id="sqlno'.$numsql.'" checked="true" class="select input'.$numMatch.'" />';
                else echo '<input type="checkbox" id="sqlno'.$numsql.'" class="select input'.$numMatch.'" />'; 
            echo '
                <span class="slider present">Présent</span>
                </label>
                </div>';
        }
    }