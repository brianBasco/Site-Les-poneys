<?php

    class Joueur {

        private $id;
        private $nom;
        private $photoPath;

        public function __construct($id, $nom, $photoPath) {
            $this->id = $id;
            $this->nom = $nom;
            $this->photoPath = $photoPath;
        }

        public function getId() {
            return $this->id;
        }

        public function getNom() {
            return $this->nom;
        }

        public function getPhotoPath() {
            return $this->photoPath;
        }

        public function afficherJoueur($presence, $numsql, $numMatch) {
            echo
                '<div class="container joueur">
                <div class="row">
                <div class="col-5">
                <button data-match="'.$numMatch.'" data-presence="'.$presence.'" data-no="'.$this->getId().'" data-sqlno="'.$numsql.'" 
                data-photo="'.$this->getPhotoPath().'" class="btn-joueur nom select input'.$numMatch.'" >'.$this->nom.'</button>
                </div>
                <div class="col-7">';

                echo '<input type="text" readonly class="presence" data-presence="'.$presence.'" />';
                
            echo '
                </div>
                </div>                
                </div>';
        }
    }

    ?>