<?php

class Match {

    private $id;
    private $nom;
    private $adresse;
    private $date;

    public function __construct($id, $nom, $adresse, $date) {
        $this->id = $id;
        $this->nom = $nom;
        $this->adresse = $adresse;
        $this->date = $date;
    }

    public function getId() {
        return $this->id;
    }

    public function getNom() {
        return $this->nom;
    }

    public function getAdresse() {
        return $this->adresse;
    }

    public function getDate() {
        return $this->date;
    }

    public function afficherMatch() {
        echo
            '<div id="match'.$this->getId().'" class="match container">
            <div>
                <p id="nom'.$this->getId().'" class="nom">'.$this->getNom().'</p>
            </div>
            <div>
                <p class="participants" id="participants'.$this->getId().'"></p>
            </div>
            <div>
                <p>'.$this->getDate().'</p>
            </div>
            <div>            
                <textarea type="text" rows="3" id="adresse'.$this->getId().'">'.$this->getAdresse().'</textarea>
            </div>
            <div>
                <button class="btn moins" id="moins'.$this->getId().'">-</button>
                <button class="btn plus" id="plus'.$this->getId().'">+</button>
                <button class="btn btn-danger suppr" id="suppr'.$this->getId().'" title="supprimmer">X</button>
            </div>
                
            </div>';
    }
}