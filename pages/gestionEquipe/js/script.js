//(function (global) {

    // Set up a namespace for our utility
    var lesJoueurs;
    var lesMatchs;
    var TousLesMatchs;
    
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
                    //console.log(element);
                    //constructionMatch(element);
                });
        })

        $ajaxUtils.sendGetRequest("php/queryMatchs.php", 
        function(request) {

            let reponse = request.responseText;
            
            let matchs = JSON.parse(reponse);
            TousLesMatchs = matchs;

                matchs.forEach(element => {
                    //console.log(element);
                    constructionMatch(element);
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

    document.querySelector("#previous").addEventListener("click", function() {
        ouvrirAffichageVotes();
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

function constructionMatch(match) {

    //match est un objet
    let ancre = document.getElementById("matchs");
    
    let div = creerBalise("div", [["id", match.id]]);
    div.className = "match";
    
    for(let attribut in match) {
        console.log("attribut " + attribut);
        let type = "text";
        let nomAttribut = "value";
        let balise;

        if(attribut == "nom") {
            balise = creerBalise("input", [["type", type], [nomAttribut, match[attribut]],
            ["pattern","[a-zA-Z0-9]{1,}"]]);
            balise.addEventListener("blur", function(element) {
                baliseInvalide(element);
            });
        }

        else {
            if(attribut == "date_match") {
            /*type = "text";
            //renversement de la date pour affichage fr
            match[attribut] =   match[attribut].split('-').reverse().join('/');        
            */
           type = "date";
            }

            else if(attribut == "heure") {
            type = "time";
            //match[attribut] = match[attribut].split(':').pop().join(':');            
            match[attribut] = match[attribut].split(':');
            match[attribut].pop();
            match[attribut] = match[attribut].join(':');
            }

        balise = creerBalise("input", [["type", type], [nomAttribut, match[attribut]]]);        
        }
        div.appendChild(balise);
    }

    let scoreNous = creerBalise("input", [["type", "text"], ["placeholder", "score Talence"]]);
    let scoreEux = creerBalise("input", [["type", "text"], ["placeholder", "score " + match.nom]]);
    div.appendChild(scoreNous);
    div.appendChild(scoreEux);

    let valider = creerBalise("button", [["query-id", match.id]]);
    valider.innerHTML = "valider changements";
    valider.addEventListener("click", function() {
        compareInputs(this);
    })
    div.appendChild(valider);

    ancre.appendChild(div);
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


function ouvrirAffichageVotes() {
    
    let div = creerBalise("div", [["id","affichageVotes"]]);
    div.className = "affichageVotes";

    let fermer = creerBalise("button", [["onclick", "fermerAffichageVotes()"]]);
    fermer.className = "fermer";
    fermer.innerHTML = 'X';
    div.appendChild(fermer);

    //balises à créer
    let contenu = ["div", "div"];
    let titres = ["Action du match", "casserole"];    

    for(let i = 0; i<contenu.length; i++) {

        //balise contenant l'ensemble d'un contenu
        let balise = document.createElement(contenu[i]);
        balise.className = "contenu";

        let titre = document.createElement("h1");
        titre.innerHTML = titres[i];
        balise.appendChild(titre);        

        let joueur = lesJoueurs[i];

        //balise contenant l'ensemble des joueurs élus
        let row = document.createElement("div");
        row.className = "enLigne";

        //balise contenant le nom et l'image
        let unJoueur = document.createElement("div");
        unJoueur.className = "unJoueur";

        let input = creerBalise("input", [["type", "text"],["readonly", "readonly"],["value", joueur.nom]]);
        input.className = "nom";        
        unJoueur.appendChild(input);

        let chemin = "../../css/images/joueurs/";
        let photo = creerBalise("img", [["src",chemin+joueur.photo]]);        
        photo.className = "photo";        
        unJoueur.appendChild(photo);

        //les joueurs sont ajoutés en ligne
        row.appendChild(unJoueur);

        //la ligne est ajoutée après le titre
        balise.appendChild(row);

        div.appendChild(balise);
    }

    document.body.appendChild(div);
    
}


function fermerAffichageVotes() {

    let div = document.getElementById("affichageVotes");
    document.body.removeChild(div);

}

function creerBalise(type, attributs){

    let balise  = document.createElement(type);

    if(attributs != null) {
        for(let i=0; i<attributs.length; i++) {
            balise.setAttribute(attributs[i][0], attributs[i][1]);
        }
    }

    return balise;
}

function compareInputs(element) {
    console.log(element);

    /* document.querySelectorAll("button").forEach(el => {
        if(el.getAttribute("query-id") == element.getAttribute("query-id"))
        el.remove(element);
        //console.log("el " + el);
    }) */

    let id = element.getAttribute("query-id");
    let div = document.getElementById(id);
    let inputs = div.querySelectorAll("input");
    let cles = [];

    console.log(inputs);
    TousLesMatchs.forEach(element => {
       if(element.id == id)  {
           console.log(element);

           //ajout de l'id du match dans le tableau des clés
           cles.push["id",id];

           let i = 0;
           let invalide = true;

           for(let cle in element) {
            
            if(cle == "nom") {
                invalide = inputs[i].validity.patternMismatch;
                if(invalide) {
                    inputs[i].focus();
                    break;
                }
            }

            if(inputs[i].value != element[cle])
                { 
                console.log("différents " + cle + " = " + element[cle] + ", input = " + inputs[i].value);
                cles.push([cle,inputs[i].value]);
                }

                else
                console.log("égaux " + cle + " = " + element[cle] + ", input = " + inputs[i].value);
                i++;            
            }       
        }
    });

    //envoi en ajax du tableau contenant les clés pour update de la bdd
    //if(!invalide) updateDb(cles);
}

function updateDb(tableau) {

    //tableau contient les clés à updater dans le fichier updateDb.php
    if(tableau.length > 1) {

        let url = "php/updateDb.php?";
        for(let i = 0; i<tableau.length; i++) {
            if(i<tableau.length-1) {
                url += tableau[i][0];
                url += "=" + tableau[i][1] + "&";
            }
            else {
                url += tableau[i][0];
                url += "=" + tableau[i][1];
            }

        }

        console.log(url);
        $ajaxUtils.sendGetRequest(url, function(request) {

            let reponse = request.responseText;

            //affichage du message de retour
        })


    }
}

function baliseInvalide(balise) {

    let target = balise.target;
    //console.log(balise);

    if(target.validity.patternMismatch) {
        target.className = "invalide";
        target.setCustomValidity("Toujours pas d'espaces !!!");
        console.log("pattern = " + target.validity.patternMismatch);
    }
    else {
        target.className = "";
        target.setCustomValidity("sans espaces c'est OK");
        console.log("pattern = " + target.validity.patternMismatch);
    }    
}