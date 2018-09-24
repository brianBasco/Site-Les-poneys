<?php

class Match {

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

    public function afficherMatch() {
        echo
            '<div class="container">
                <input type="text" value="'.$this->getNom().'" id="'.$this->getId().'" />
                <button class="moins" id="moins'.$this->getId().'">-</button>
                <button class="plus" id="plus'.$this->getId().'">+</button>
                <button id="modifier'.$this->getId().'">modifier</button>
                <button id="suppr'.$this->getId().'">supprimmer</button>
                <div>
                    <textarea type="text"></textarea>
                    <h1>joueurs</h1>
                </div>
            </div>';
    }
}