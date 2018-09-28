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

function updateParticipants(element) {
    
    //substring de "sqlno" pour update de la bdd
    let row = element.id.substring(5);

    let count = 0;

    let maClasse = element.classList[1];

    //substring de "input" pour recalculer le nbre de participants
    let numMatch = maClasse.substring(5);

    document.querySelectorAll("." + maClasse).forEach(el => {
        if(el.checked) count ++;
    })

    let div = document.getElementById("participants" + numMatch);

    if(count > 1) div.innerHTML = count + " joueurs";
    else div.innerHTML = count + " joueur";
    
    //insertion dans la bdd de la présence du joueur en requête AJAX
    //Présence du joueur
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

    //
    //numero du match, substring de "match"
    let numMatch = element.id.substring(5);
    let div = document.getElementById("participants" + numMatch);

    let count = 0;
    document.querySelectorAll(".input" + numMatch).forEach(el => {
        if(el.checked) count ++;
    });

    if(count > 1) div.innerHTML = count + " joueurs";
    else div.innerHTML = count + " joueur";
   
}

function demandeDeSuppression(element) {
    if(window.confirm("supprimmer le match ?")) {

        //num de match = id et substring de "suppr"
        let numMatch = element.id.substring(5);
        let url = "php/supprMatch.php?match=" + numMatch;
        $ajaxUtils.sendGetRequest(url, function() {

        });

        location = location;
    }
}