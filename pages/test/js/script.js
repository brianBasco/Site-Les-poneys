
//variables globales, namespace lesScores
    var Info = {
        matchs : null,
        votes : null,
    };

    var Matchs = [];

    /* var match = {
        id: null,
        nom: null,
        date: null,
        action: [],
        cagade: []
    }; */
    

document.addEventListener("DOMContentLoaded", function (event) {

    $( ".retour" ).on( "click", function( event ) {
        retour();
      });

      $ajaxUtils.sendGetRequest("php/queryMatchs.php", 
      function(request) {

          let reponse = request.responseText;
          
          Info.matchs = JSON.parse(reponse);   
          
          console.log(Info.matchs);

          Info.matchs.forEach(element => {
            let unMatch = new Object();
            unMatch.id = element.id;
            unMatch.nom = element.nom;
            unMatch.date = element.date_match;
            unMatch.action = [];
            unMatch.cagade = [];
            Matchs.push(unMatch);

          })

          Matchs.forEach(element => {
            console.log(element);    
          });
          


          

        })

       
        $ajaxUtils.sendGetRequest("php/queryVotes.php", 
      function(request) {

          let reponse = request.responseText;
          
            Info.votes = JSON.parse(reponse);

            console.log(Info.votes);
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

