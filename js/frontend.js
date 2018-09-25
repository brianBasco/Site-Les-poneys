document.addEventListener("DOMContentLoaded",
  function (event) {

    /* document.querySelector(".plus")
        .addEventListener("click", plus(this.id));
        
    document.querySelector(".moins")
        .addEventListener("click", moins(this.id)); */

    /*
    document.querySelector("#ajout")
        .addEventListener("click", function() {
            //ouvrirBalise();
            ajouterMatch();
        });
    */
   
    var nbreMatchs = document.getElementsByClassName("match");
    for(var i = 0; i<nbreMatchs.length; i++) { 
        document.querySelector("#moins" + (i+1))
        .addEventListener("click", function() {
            //fermerBalise();
            fermerJoueurs(this);
        
        });
        document.querySelector("#plus" + (i+1))
        .addEventListener("click", function() {
            //ouvrirBalise();
            ouvrirJoueurs(this);
        });    
    }
    
    
  });

//Afficher le contenu du match
function plus(container) {
    var id = "#" + container;
    document.getElementById(id).style = "height:0px";
}

//Cacher le contenu du match
function moins(container) {
    var id = "#" + container;
    document.getElementById(id).style = "height:intial";
}

function ouvrirBalise() {
    document.getElementById("matchPlus").style = "height:100px";
}

function ajouterMatch() {

    
        // crée un nouvel élément div 
        var newDiv = document.createElement("div");
        
        var monInput = document.createElement("input") ;
        monInput.setAttribute("type", "text");
        monInput.setAttribute("name", "nom");
        monInput.setAttribute("placeholder" , "Nom du match");

        // ajoute le noeud texte au nouveau div créé
        newDiv.appendChild(monInput); 
        
        var noeud = document.getElementById("listeMatchs");
      
        // ajoute le nouvel élément créé et son contenu dans le DOM 
        var currentDiv = document.getElementById("insertionMatch"); 
        noeud.insertBefore(newDiv, currentDiv); 

        /* <div id="matchPlus" class="ajout container">
        <input type="text" name="nom" placeholder="Nom du match"/>
        <button class="moins">-</button>
        <button class="plus">+</button>
        <button class="modifier">modifier</button>
        <button class="supprimmer">supprimmer</button>
        <div class="joueurs">
            <textarea type="text"></textarea>
            <h1>joueurs</h1>
        </div>
        <div class="commentaires">
        </div>
    </div> */
}

function fermerJoueurs(element) {

    //On récupère le numéro en substring de "moins"
    var num = element.id.substring(5);
    var div = document.getElementById("joueurs" + num);
    div.style = "max-height: 0px";
}

function ouvrirJoueurs(element) {
    
    //On récupère le numéro en substring de "plus"
    var num = element.id.substring(4);
    var div = document.getElementById("joueurs" + num);
    div.style = "max-height: 999px";
}