document.addEventListener("DOMContentLoaded",
  function (event) {
   
    var nbreMatchs = document.getElementsByClassName("match");

    for(var i = 0; i<nbreMatchs.length; i++) { 
        document.querySelector("#moins" + (i+1))
        .addEventListener("click", function() {
            //fermer le container;
            fermerJoueurs(this);
        
        });
        document.querySelector("#plus" + (i+1))
        .addEventListener("click", function() {
            //ouvrir le container;
            ouvrirJoueurs(this);
        });
        
        afficherNbreParticipants(nbreMatchs[i]);
    }
    //eventListener sur les input des joueurs    
    document.querySelectorAll(".select").forEach(element => {
        element.addEventListener("click", function() {
            nbreParticipants(this);            
        })
    })
    
    
  });


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

function nbreParticipants(element) {
    
    //element est l'input qui a été cliquée
    //ID du Parent de l'élément qui contient l'id
    var id = element.parentNode.parentNode.parentNode.id;
    console.log(id);

    //NUMERO DU MATCH, substring de "joueurs..."
    var numMatch = id.substring(7);

    //NUMERO DE JOUEUR, contenu dans la classe sqlno
    var numJoueur = element.classList[1].substring(5);

    //nombre d'inputs checked d'après le container "joueurs"
    var parent = document.getElementById(id);
    let count = rechercheDansNoeuds(parent);
    
    //insertion dans la balise participants, substring de "joueurs..."
    var div = document.getElementById("participants" + numMatch);

    if(count > 1) div.value = count + " joueurs";
    else div.value = count + " joueur";

    //insertion dans la bdd de la présence du joueur en requête AJAX
    //Présence du joueur
    let presence;
    element.checked? presence = 1: presence=0;

    let url = "php/updatedb.php?match=" + numMatch +"&joueur=" + numJoueur +"&presence=" + presence;
    console.log(url);
    
    $ajaxUtils
        .sendGetRequest(url, function(request) {
            //location = url;
    });
}

function afficherNbreParticipants(element) {

    //numero du match
    let numMatch = element.id.substring(5);

    //Recherche des input dans le conteneur joueurs    
    let parent = document.getElementById("joueurs" + numMatch);

    let count = rechercheDansNoeuds(parent);
    
    //insertion dans la balise participants, substring de "joueurs..."
    var div = document.getElementById("participants" + numMatch);

    if(count > 1) div.value = count + " joueurs";
    else div.value = count + " joueur";

}

function rechercheDansNoeuds(div) {
   
    let noeuds = div.children;
    let count = 0;
    for(let i = 0; i<noeuds.length; i++) {        
        
        //Itération sur tous les chidlren de "joueurs" qui contiennent une input
        if(noeuds[i].children[1].children[0].checked) count++;
    }

    return count;
}