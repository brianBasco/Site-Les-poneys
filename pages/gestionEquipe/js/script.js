
document.addEventListener("DOMContentLoaded", function (event) {
    $( ".retour" ).on( "click", function( event ) {
        retour();
      });

      $ajaxUtils.sendGetRequest("php/vue/matchs.php", 
        function(request) {

            let reponse = request.responseText;
            console.log(reponse);
            let rep = JSON.parse(reponse);
            construit(rep);
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
        input.setAttribute("value", objet[i].nom);

        
        document.body.appendChild(input);

    }
}