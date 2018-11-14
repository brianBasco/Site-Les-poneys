<?php

    class Match {

        private $id;
        private $nom;
        private $date_match;
        private $action;
        private $cagade;

        public function __construct($id, $nom, $date_match){
            $this->id = $id;
            $this->nom = $nom;
            $this->date_match = $date_match;
            $this->action = array();
            $this->cagade = array();
        }

        public function get_id() {
            return $this->id;
        }

        public function get_nom() {
            return $this->nom;
        }

        public function get_date_match() {
            return $this->date_match;
        }

        public function get_action() {
            return $this->action;
        }

        public function get_cagade() {
            return $this->cagade;
        }

        public function set_action($tab) {
            $this->action = $tab;
        }

        public function set_cagade($tab) {
            $this->cagade = $tab;
        }

    }
?>