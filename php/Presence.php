<?php

    class Presence {

        private $numMatch;
        private $numJoueur;
        private $present;

        public function __construct($numMatch, $numJoueur, $present) {
            $this->numMatch = $numMatch;
            $this->numJoueur = $numJoueur;
            $this->present = $present;
        }

        public function getNumMatch() {
            return $this->numMatch;
        }

        public function getNumJoueur() {
            return $this->numJoueur;
        }
        public function getPresent() {
            return $this->present;
        }
    }