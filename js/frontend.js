document.addEventListener("DOMContentLoaded",
  function (event) {
   
    document.querySelectorAll(".match").forEach(element => {
        afficherNbreParticipants(element);
    });

    document.querySelectorAll(".moins").forEach(element => {
        element.addEventListener("click", function() {
            //fermer le container;
            fermerJoueurs(this);
        }) 
    });

        document.querySelectorAll(".plus").forEach(element => {
            element.addEventListener("click", function() {
                //ouvrir le container;
                ouvrirJoueurs(this);
        })
    });

    document.querySelectorAll(".nom").forEach(element => {
        element.addEventListener("click", function() {
            //ouvrir le container;
            ouvrirJoueur(this);
    })
});
        
        
    //eventListener sur les input des joueurs    
    document.querySelectorAll(".select").forEach(element => {
        element.addEventListener("click", function() {
            updateParticipants(this);            
        })
    })
    
    document.querySelectorAll(".suppr").forEach(element => {
        element.addEventListener("click", function() {
            demandeDeSuppression(this);
        })
    })
    
  });


function fermerJoueurs(element) {

    let num = element.getAttribute("data-match");
    let div = document.getElementById("joueurs" + num);
    //console.log(num);
    
    div.style.maxHeight = "0px";
    setTimeout(function() {
        div.style.opacity = 0;
        div.style.display = "hidden";
    }, 1100);
}

function ouvrirJoueurs(element) {
    
    let num = element.getAttribute("data-match");
    let div = document.getElementById("joueurs" + num);

    div.style.maxHeight = "initial";
    div.style.display = "block";    
    let hauteur = div.offsetHeight;
    div.style.maxHeight = "0px";
    setTimeout(function() {
        div.style.opacity = 1;
        div.style.maxHeight = hauteur + "px";
    }, 10);
}

function updateParticipants(element) {
    
    let numMatch = element.getAttribute("data-match");
    let div = document.getElementById("participants" + numMatch);

    calculerParticipants(numMatch, div);
   
    //insertion dans la bdd de la présence du joueur en requête AJAX
    //Présence du joueur
    //substring de "sqlno" pour update de la bdd
    let row = element.id.substring(5);

    let presence;
    element.checked? presence = 1: presence=0;

    let url = "php/updatedb.php?ligne=" + row + "&presence=" + presence;
    console.log(url);
    
    $ajaxUtils
        .sendGetRequest(url, function(request) {
            //location = url;
    });
}

function afficherNbreParticipants(element) {
   
    let numMatch = element.getAttribute("data-match");
    let div = document.getElementById("participants" + numMatch);

    calculerParticipants(numMatch, div);
}

function calculerParticipants(numMatch, div){
    let count = 0;
    document.querySelectorAll(".input" + numMatch).forEach(el => {
        if(el.checked) count ++;
    });

    let joueur = " joueur";
    
    if(count > 1) joueur+="s";

    div.innerHTML = count + joueur;
}

function demandeDeSuppression(element) {
    if(window.confirm("supprimmer le match ?")) {
        
        let numMatch = element.getAttribute("data-match");
        let url = "php/supprMatch.php?match=" + numMatch;
        $ajaxUtils.sendGetRequest(url, function() {
            let noeud = document.getElementById("listeMatchs");
            let divMatch = document.getElementById("match" + numMatch);
            let divJoueurs = document.getElementById("joueurs" + numMatch);

            noeud.removeChild(divMatch);
            noeud.removeChild(divJoueurs);
        });

        //location = location;
    }
}

function ouvrirJoueur(element) {

    //nosql
    console.log("sql : " + element.getAttribute("data-joueur"));
    //nomjoueur
    console.log("nom : " + element.innerHTML);
    let nomjoueur = element.innerHTML;
    //presence
    //commentaire

    let divJoueur = document.getElementById("nomJoueur");
    divJoueur.value = nomjoueur;

}