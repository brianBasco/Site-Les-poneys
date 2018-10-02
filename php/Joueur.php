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
                <label data-match="'.$numMatch.'" data-no="'.$this->getId().'" data-joueur="'.$numsql.'" 
                class="nom select input'.$numMatch.'" >'.$this->nom.'</label>';
                if($presence == 0) echo '<input type="text" class="sansVote" value="no vote" />';
                if($presence == 1) echo '<input type="text" class="present" value="présent" />';
                if($presence == 2) echo '<input type="text" class="retard" value="à la bourre" />';
                if($presence == 3) echo '<input type="text" class="absent" value="absent" />';
                if($presence == 4) echo '<input type="text" class="incertain" value="incertain" />'; 
            echo '
                
                </div>';
        }

        public function afficherVote() {
            echo
                '<input type="text" value="'.$this->getNom().'" />';
        }
    }

    ?>