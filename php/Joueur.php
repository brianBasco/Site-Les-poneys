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

        public function afficherJoueur($presence) {
            echo
                '<div class="joueur">
                <label class="nom">'.$this->nom.'</label>
                <label class="switch">';
                if($presence == 1) echo '<input type="checkbox" checked="true" class="select sqlno'.$this->getId().'" />';
                else echo '<input type="checkbox" class="select sqlno'.$this->getId().'" />'; 
            echo '
                <span class="slider present">Présent</span>
                </label>
                <input type="text" placeholder="commentaire" />
                </div>';
        }
    }