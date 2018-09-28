<?php

    class Presence {

        private $id;
        private $numMatch;
        private $numJoueur;
        private $present;

        public function __construct($id, $numMatch, $numJoueur, $present) {
            $this->id = $id;
            $this->numMatch = $numMatch;
            $this->numJoueur = $numJoueur;
            $this->present = $present;
        }

        public function getId() {
            return $this->id;
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