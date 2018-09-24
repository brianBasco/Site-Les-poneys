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

        public function afficherJoueur() {
            echo
                '<div class="joueur">
                <label class="nom">'.$this->nom.'</label>
                <label class="switch">
                <input type="checkbox" />
                <span class="slider round present">Présent</span>
                </label>

                <label class="switch">
                <input type="checkbox" />
                <span class="slider round retard">A la bourre</span>
                </label>

                <label class="switch">
                <input type="checkbox" />
                <span class="slider round absent">Absent</span>
                </label>

                <label class="switch">
                <input type="checkbox" />
                <span class="slider round incertain">Ne sait pas</span>
                </label>
                </div>';
        }
    }