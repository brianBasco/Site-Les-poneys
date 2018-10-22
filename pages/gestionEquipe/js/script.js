//(function (global) {

    // Set up a namespace for our utility
    var lesJoueurs;
    var lesMatchs;
    
    //})(window);

document.addEventListener("DOMContentLoaded", function (event) {

    

    $( ".retour" ).on( "click", function( event ) {
        retour();
      });

      $ajaxUtils.sendGetRequest("php/vue/joueurs2.php", function(request) {

        let reponse = request.responseText;

        let joueurs = JSON.parse(reponse);

        //deviennent GLOBAL
        lesJoueurs = joueurs;
        
    
    //construireScoreBoard(matchs);
    })

      $ajaxUtils.sendGetRequest("php/vue/matchs.php", 
        function(request) {

            let reponse = request.responseText;
            
            let matchs = JSON.parse(reponse);

            //deviennent GLOBAL
            lesMatchs = matchs;

                matchs.forEach(element => {
                    console.log(element);
                    construit(element);
                });
        })

        

        $ajaxUtils.sendGetRequest("php/vue/votes.php", 
        function(request) {

            let reponse = request.responseText;
            
            //let votes = JSON.parse(reponse);
            //console.log(reponse);
            //construitVotes(votes);
            //construireScoreBoard(matchs);
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

function construit(match) {

    let ancre = document.getElementById("matchs");

    let div = document.createElement("div");
    div.className = "match";
    div.id = match.id;

    let nom = document.createElement("input");
    nom.setAttribute("type", "text");
    nom.value = match.nom;

    //rattacher les joueurs
    let joueurs = listeJoueurs(match.joueurs);
    joueurs.forEach(el => {
        div.appendChild(el);
    })

    ancre.appendChild(div);
    console.log(lesJoueurs);
}

function listeJoueurs(liste) {
    
    let tab = [];
    liste.forEach(el => {
        
        let input = document.createElement("input");
        input.setAttribute("data-nosql", el.id);
        input.setAttribute("type", "text");
        //recup du nom

        //console.log(lesJoueurs);
        if(lesJoueurs != undefined) {
            lesJoueurs.forEach(element => {
                if(element.id == el.num_joueur) input.value = element.nom;
            })
        }
        else input.value = "pas encore chargé";
        
        tab.push(input);
    })

    return tab;
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

function construitVotes(tab) {
    for(let i = 0; i<tab.length; i++) {

        let input = document.createElement("input");

        input.setAttribute("type", "text");
        input.className = "votes";
        input.setAttribute("data-id", tab[i].id);
        input.setAttribute("value", tab[i].num_vote);
        document.body.appendChild(input);

    }
}


