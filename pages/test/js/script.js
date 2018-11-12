
//variables globales, namespace lesScores
    var LesScores = {
        lesScores : null,
        base : 0,
        unDecalage : 225
    };

document.addEventListener("DOMContentLoaded", function (event) {

    $( ".retour" ).on( "click", function( event ) {
        retour();
      });


      $ajaxUtils.sendGetRequest("php/queryScores.php", 
      function(request) {

          let reponse = request.responseText;

          //reponse reçoit le tableau de la bdd des scores
          let tableau = JSON.parse(reponse);

          LesScores.lesScores = tableau;

          construireScoreBoard(tableau);
        
      })

    document.querySelector("#previous").addEventListener("click", function() {
        decalerScores(-LesScores.unDecalage);
    })

    document.querySelector("#next").addEventListener("click", function() {
        decalerScores(LesScores.unDecalage);
    })

        
})        

function retour() {
    location ="../../index.php";
}

function decalerScores(decalage) {
    let scores = document.querySelectorAll(".scoreBoardMatch");
    let res = (LesScores.base + decalage);
    for(let i = 0; i<scores.length; i++) {            
        scores[i].style.left = res + "px";
    }
    LesScores.base = res;
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

function construireScoreBoard(tab) {

    let scores = document.getElementById("scoreBoard_contenu");
    scores.style.width = (tab.length * 225) + "px";

    for(let i = 0; i<tab.length; i++) {

        let match = tab[i];

        let div = document.createElement("div");
        div.className = "scoreBoardMatch";

        let date = document.createElement("input");
        date.setAttribute("type", "text");
        date.className = "date";
        date.value = dateFormatFr(match.date_match);


        let talence = document.createElement("input");
        talence.setAttribute("type", "text");
        talence.className = "scoreBoardNom";
        talence.value = "talence";

        let nous = document.createElement("input");
        nous.setAttribute("type", "text");
        nous.value = match.nous;

        let nom = document.createElement("input");
        nom.setAttribute("type", "text");
        nom.id = "score_" + match.num_match;
        nom.className = "scoreBoardNom";
        nom.value = match.nom;        

        let eux = document.createElement("input");
        eux.setAttribute("type", "text");
        eux.value = match.eux;

        div.appendChild(date);
        div.appendChild(document.createElement("hr"));
        div.appendChild(talence);
        div.appendChild(nous);
        div.appendChild(nom);        
        div.appendChild(eux);

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

function dateFormatFr(date) {
    return date.split("-").reverse().join("-");
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
    //ajout de l'id du match dans le tableau des clés
    cles.push(["id",id]);
    let invalide = true;

    console.log(inputs);
    TousLesMatchs.forEach(element => {
       if(element.id == id)  {
           console.log(element);

           let i = 0;           

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
                //MAJ de la variable globale avec le nouvelle value
                element[cle] = inputs[i].value;
                }

                else
                console.log("égaux " + cle + " = " + element[cle] + ", input = " + inputs[i].value);
                i++;            
            }       
        }
    });

    //envoi en ajax du tableau contenant les clés pour update de la bdd
    console.log("cles  = " + cles);
    if(!invalide) updateDb(cles);

    //enregistrement des scores
    enregistrerScores(id, inputs);    
}

function updateDb(tableau) {

    //tableau contient les clés à updater dans le fichier updateDb.php
    if(tableau.length > 1) {

        let id = tableau[0][1];

        let url = "php/updateMatch.php?";
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
        
         $ajaxUtils.sendGetRequest(url, function(request) {

            let reponse = request.responseText;
            messageDeRetour(id, reponse);
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

function enregistrerScores(id, tableau) {

     //reçoit toutes les inputs de la div du match
    //sélectionne les 2 dernières inputs qui correspondent aux inputs des scores
    let taille = tableau.length;
    let modif = false;   
    
    let nous = null;
    let eux = null;
    
    let tabNous = tableau[taille-2].value;
    let tabEux = tableau[taille-1].value;

    if(tabNous != "" && tabEux != "") {
        modif = comparerScores(id, tabNous, tabEux);
    }

    if(modif) {
        if(!(tabNous>=0 && tabNous<=3) || !(tabEux>=0 && tabEux<=3)) messageDeRetour(id, "score invalide");
        else  {
            nous = tabNous;
            eux = tabEux;
        }
    }
   
    console.log("nous : " + nous + ",  eux : " + eux);

    //requête uniquement si les 2 variables ne sont pas nulles
    if(nous != null && eux != null) {
        let url = "php/updateScores.php?id=" + id + "&nous=" + nous +"&eux=" + eux;
        //location = url;
        $ajaxUtils.sendGetRequest(url, function(request) {

            let reponse = request.responseText;

            //affichage du message de retour
            messageDeRetour(id,reponse);
        })
    }    
}

function comparerScores(id, nous, eux) {

    let modif = false;
    let tab = LesScores.lesScores;

    for(let i =0; i<tab.length; i++) {
        if(tab[i].num_match == id) {
            if(tab[i].nous != nous) {
                modif = true;
                tab[i].nous = nous;
            }
            else if(tab[i].eux != eux) {
                modif = true;
                tab[i].eux = eux;
            }
            break;
        }
    }
    return modif;
}

function messageDeRetour(id, message){

    let div = document.getElementById(id);

    let input = creerBalise("input", [["type", "text"], ["value", message], ["readonly", "readonly"]]);
    input.className = "validation retour";
    div.appendChild(input);

    setTimeout(function() {
        div.removeChild(input);
    }, 3000);
}