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
                if($presence == 0) echo '<input type="text" readonly class="sansVote" value="no vote" />';
                if($presence == 1) echo '<input type="text" readonly class="present" value="présent" />';
                if($presence == 2) echo '<input type="text" readonly class="retard" value="à la bourre" />';
                if($presence == 3) echo '<input type="text" readonly class="absent" value="absent" />';
                if($presence == 4) echo '<input type="text" readonly class="incertain" value="incertain" />'; 
            echo '
                </div>
                </div>                
                </div>';
        }
    }

    ?>