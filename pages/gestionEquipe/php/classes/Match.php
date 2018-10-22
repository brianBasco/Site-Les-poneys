<?php

class Match {

    public $nom;
    public $id;
    public $joueurs;

    //joueurs est un tableau contenant les joueurs
    public function __construct($id, $nom, $joueurs) {
        $this->id = $id;
        $this->nom = $nom;
        $this->joueurs = $joueurs;
    }
}

?>