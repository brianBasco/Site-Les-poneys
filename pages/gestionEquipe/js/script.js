
document.addEventListener("DOMContentLoaded", function (event) {

    var matchs;

    $( ".retour" ).on( "click", function( event ) {
        retour();
      });

      $ajaxUtils.sendGetRequest("php/vue/matchs.php", 
        function(request) {

            let reponse = request.responseText;
            
            matchs = JSON.parse(reponse);
            console.log(matchs);
            construit(matchs);
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
    let num = el.getAttribute("data-id");

    for(let i = 0; i<tab.length; i++) {
        if(tab[i].id == num) {
            /* tab[i].nom  = el.value;
            console.log(tab[i].nom); */
            tab.splice(i, 1);
            construit(tab);
            break;
        }
    }
}

