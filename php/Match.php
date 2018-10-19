<?php

class Match {

    private $id;
    private $nom;
    private $adresse;
    private $date;
    private $heure;

    public function __construct($id, $nom, $adresse, $date, $heure) {
        $this->id = $id;
        $this->nom = $nom;
        $this->adresse = $adresse;
        $this->date = $date;
        $this->heure = $heure;
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

    public function getHeure() {
        return $this->heure;
    }

    public function afficherMatch() {
        echo
            '<div class="col-sm-12 col-md-6 col-lg-4">
            <div id="match'.$this->getId().'" class="match"  data-match="'.$this->getId().'" 
            data-date="'.$this->getDate().'" data-heure="'.$this->getHeure().'" >
            <div class="info">
                <p id="nom'.$this->getId().'" >'.$this->getNom().'</p>
            </div>
            <div class="info">
                <p class="participants" id="participants'.$this->getId().'"></p>
            </div>
            <div class="info">
                <p>'.$this->getDate().'</p>
            </div>
            <div class="info">
                <p>'.$this->getHeure().'</p>
            </div>
            <div class="info">            
                <textarea type="text" readonly rows="3" id="adresse'.$this->getId().'">'.$this->getAdresse().'</textarea>
            </div>
            <div class="info boutons">
                <button class="btn btn-match moins eventMoins" data-match="'.$this->getId().'" >-</button>
                <button class="btn btn-match plus eventPlus" data-match="'.$this->getId().'" >+</button>
                <button class="btn btn-mail" data-match="'.$this->getId().'" ></button>
            </div>';            
            //La fin de la div col etc est dans le fichier listeDesMatchs
    }
}