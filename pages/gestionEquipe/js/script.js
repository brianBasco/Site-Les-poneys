
document.addEventListener("DOMContentLoaded", function (event) {

    

    $( ".retour" ).on( "click", function( event ) {
        retour();
      });

      $ajaxUtils.sendGetRequest("php/vue/matchs.php", 
        function(request) {

            let reponse = request.responseText;
            
            let matchs = JSON.parse(reponse);
            console.log(matchs);
            construit(matchs);
            construireScoreBoard(matchs);
        })
})        

function retour() {
    location ="../../index.php";
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
    }
}

function construit(objet) {

    for(let i = 0; i<objet.length; i++) {

        let input = document.createElement("input");

        input.setAttribute("type", "text");
        input.className = "matchs";
        input.setAttribute("data-id", objet[i].id);
        input.setAttribute("value", objet[i].nom);
        input.addEventListener("blur", function() {
            modifierTab(this, objet);
        });

        
        document.body.appendChild(input);

    }
}

function modifierTab(el, tab) {
    console.log(el);
    //let num = el.getAttribute("data-id");
    
    document.body.removeChild(el);
}

function construireScoreBoard(tab) {
    let scores = document.getElementById("scoreBoard");

    let ul  = document.createElement("ul");

    for(let i = 0; i<tab.length; i++) {

        let match = tab[i];
        

        //let li = document.createElement("li");

        let div = document.createElement("div");
        div.className = "scoreBoardMatch";

        let nom = document.createElement("div");
        nom.setAttribute("data-id", match.id);
        nom.className = "scoreBoardNom";
        nom.innerHTML = match.nom;

        let date = document.createElement("div");
        date.innerHTML = match.date_match;
        
        //li.innerHTML = match.nom;
        //li.appendChild(p);
        //li.appendChild(date);

        div.appendChild(nom);
        div.appendChild(date);

        scores.appendChild(div);
    }
}

