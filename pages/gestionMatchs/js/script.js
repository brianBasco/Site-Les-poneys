//(function (global) {

    // Set up a namespace for our utility
    var TousLesMatchs;
    var lesScores;
    
    //})(window);

document.addEventListener("DOMContentLoaded", function (event) {

    

    $( ".retour" ).on( "click", function( event ) {
        retour();
      });
      

        $ajaxUtils.sendGetRequest("php/queryMatchs.php", 
        function(request) {

            let reponse = request.responseText;
            
            let matchs = JSON.parse(reponse);
            TousLesMatchs = matchs;

                matchs.forEach(element => {
                    //console.log(element);
                    constructionMatch(element);
                });

                $ajaxUtils.sendGetRequest("php/queryScores.php", 
                function(request) {

                    let reponse = request.responseText;
                    
                    lesScores = JSON.parse(reponse);
                    //remplissage des inputs des scores
                    for(let i = 0; i<lesScores.length; i++) {
                        let id = lesScores[i].num_match;
                        
                        let div = document.getElementById(id);
                        let inputs = div.querySelectorAll("input");
                
                        for(let j = 0; j<inputs.length; j++) {
                            //console.log("inputs = " + inputs);
                            if(inputs[j].getAttribute("data_score") == "nous")
                            inputs[j].value = lesScores[i].nous;
                            else if(inputs[j].getAttribute("data_score") == "eux")
                            inputs[j].value = lesScores[i].eux;
                        }
                    }
            
                })
            })
        
})        

function retour() {
    location ="../../index.php";
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

        if(attribut == "id"){
            balise = creerBalise("input", [["type", type], [nomAttribut, match[attribut]]]);
            balise.className = "cache";
        }

        else if(attribut == "nom") {
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

    let scoreNous = creerBalise("input", [["type", "text"], ["placeholder", "score Talence"],
    ["data_score","nous"]]);
    let scoreEux = creerBalise("input", [["type", "text"], ["placeholder", "score " + match.nom],
    ["data_score","eux"]]);
    div.appendChild(scoreNous);
    div.appendChild(scoreEux);

    let valider = creerBalise("button", [["query-id", match.id]]);
    valider.innerHTML = "valider changements";
    valider.className = "btn";
    valider.addEventListener("click", function() {
        compareInputs(this);
    })
    div.appendChild(valider);

    ancre.appendChild(div);
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
    if(!invalide) updateMatch(cles);

    //enregistrement des scores
    enregistrerScores(id, inputs);    
}

function updateMatch(tableau) {

    //tableau contient les clés à updater dans le fichier updateMatch.php
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

    //Si tab est vide, il n'y a aucun score dans la bdd, on peut donc la mettre a jour
    if(lesScores.length == 0) return true;

    for(let i =0; i<lesScores.length; i++) {
        //s'il trouve le match il compare
        if(lesScores[i].num_match == id) {
            if(lesScores[i].nous != nous) {
                modif = true;
                lesScores[i].nous = nous;
            }
            else if(lesScores[i].eux != eux) {
                modif = true;
                lesScores[i].eux = eux;
            }
            break;
        }
        //sinon pas encore de score donc MAJ de la bdd à faire
        else return true;
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