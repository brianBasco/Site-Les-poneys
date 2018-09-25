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
                
                
                    <input type="text" class="nom" value="'.$this->getNom().'" id="nom'.$this->getId().'" />
                    <input type="text" class="participants" placeholder="participants" />
               
                <textarea type="text" rows="3" id="adresse'.$this->getId().'">'.$this->getAdresse().'</textarea>
                <input type="date" value="'.$this->getDate().'" id="date'.$this->getId().'" />
                <button class="btn moins" id="moins'.$this->getId().'">-</button>
                <button class="btn plus" id="plus'.$this->getId().'">+</button>
                <button class="btn btn-danger suppr" id="suppr'.$this->getId().'" title="supprimmer">X</button>
                
            </div>';
    }
}