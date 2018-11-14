
//variables globales, namespace lesScores
    var Info = {
        matchs : null,
        action : null,
        cagade : null
    };

    var Matchs = [];
    

document.addEventListener("DOMContentLoaded", function (event) {

    $( ".retour" ).on( "click", function( event ) {
        retour();
      });

      $ajaxUtils.sendGetRequest("php/queryMatchs.php", 
      function(request) {

          let reponse = request.responseText;
          
          Info.matchs = JSON.parse(reponse);

          Info.matchs.forEach(element => {
            let unMatch = new Object();
            unMatch.id = element.id;
            unMatch.nom = element.nom;
            unMatch.date = element.date_match;
            unMatch.action = [];
            unMatch.cagade = [];
            Matchs.push(unMatch);

          })
          

        //Les matchs sont construits et les votes sont des tableaux vides pour l'instant
        $ajaxUtils.sendGetRequest("php/queryAction.php", 
            function(request) {

            let reponse = request.responseText;  
            Info.action = JSON.parse(reponse);

            //insertion des votes dans chaque match
            Matchs.forEach(match => {
                Info.action.forEach(vote => {
                    if(match.id == vote.num_match) 
                        match.action.push(vote.num_vote);
                })
            })

            //Les matchs sont construits et les votes sont des tableaux vides pour l'instant
            $ajaxUtils.sendGetRequest("php/queryCagade.php", 
            function(request) {

            let reponse = request.responseText; 
            Info.cagade = JSON.parse(reponse);

            //insertion des votes dans chaque match
            Matchs.forEach(match => {
                Info.cagade.forEach(vote => {
                    if(match.id == vote.num_match) 
                        match.cagade.push(vote.num_vote);
                })
            });

            Matchs.forEach(match => {
                //construit le frontend
                //si les tableaux ne sont pas vides
                //fonction à mettre dans la boucle avant, pour chaque match
                if(match.action.length > 0 || match.cagade.length > 0)
                    constructionMatch(match);
            });
        })


        })
    })
        
})        

function retour() {
    location ="../../index.php";
}

function constructionMatch(match) {

    let maxCount;
    let gagnant;
    let perdant;
    let tailleAction;
    let tailleCagade;

    console.log("pb ???");

    if(match.action.length > 0) {
        let action = match.action;
        //nbre de votants
        tailleAction = action.length;
        maxCount = calculerMaxCount(action);
        gagnant = joueurEnTete(action, maxCount);
        for(let i = 0; i<gagnant.length; i++) {
            console.log("winner " + gagnant[i]);
        }
    }
    if(match.cagade.length > 0) {
        let cagade = match.cagade;
        //nbre de votants
        tailleCagade = cagade.length;
        maxCount = calculerMaxCount(cagade);
        perdant = joueurEnTete(cagade, maxCount);
        for(let i = 0; i<perdant.length; i++) {
            console.log("perdant " + perdant[i]);
        }
    }

    //match est un objet
    //à ce stade action ou cagade est n'est pas vide, pas besoin de check
    let ancre = document.getElementById("matchs");
    
    let div = creerBalise("div", [["id", match.id]]);
    div.className = "match";
    
    /* for(let attribut in match) {
        let balise = creerBalise("input", [["type", "text"],["value", match[attribut]]]);
        div.appendChild(balise);
    } */

    let nom = creerBalise("input", [["type", "text"],["value", match["nom"]]]);
    div.appendChild(nom);

    for(let i = 0;i<gagnant.length; i++) {
        console.log(gagnant);
    let win = creerBalise("input", [["type", "text"],["value", gagnant[i]]]);
    //nbre de votants
    let winVotants = creerBalise("input", [["type", "text"],["value", tailleAction]]);
    div.appendChild(winVotants);
    div.appendChild(win);
    }

    for(let i = 0;i<perdant.length; i++) {
        console.log(perdant);
    let loose = creerBalise("input", [["type", "text"],["value", perdant[i]]]);
    let looseVotants = creerBalise("input", [["type", "text"],["value", tailleCagade]]);
    div.appendChild(looseVotants);
    div.appendChild(loose);
    }

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


//retourne le nombre max trouvé dans un tableau, pas l'indice
// tab[1,1,1,3,3,2] retourne 3
function calculerMaxCount(tab) {
    
    let max = 0;
   
    let taille = tab.length;
    for(let i = 0; i<taille; i++) {

        let compte = count(tab, tab[i]);
        console.log("compte = " + compte);

        if(compte > max) max = compte;
    }

    console.log("max = " + max);
    return max;
}

//retourne le num de joueur compté le plus dans un tableau
// tab[1,1,1,3,3,2] retourne 1
function joueurEnTete(tab, comptage) {

    //res retourne le tableau des joueurs qui ont le compte max
    //plusieurs joueurs peuvent être ex aequo
    let res = [];
    if(tab.length >0) {

        let taille = tab.length;
        for(let i = 0; i<taille; i++) {

            let compte = count(tab, tab[i]);
            console.log("count = " + compte);

            if(compte == comptage) {
                //verif si pas déjà de doublons
                let doublons = false;
                for(let j = 0; j<res.length; j++) {
                    if(res[j] == tab[i]) doublons = true;
                }
                if(!doublons)  res.push(tab[i]);
            }

        }
    }
    console.log("res " + res);
    return res;
}

function count(tab, valeur) {

    let count = 0;

    if(tab.length > 0) {
        for(let i = 0; i<tab.length; i++) {
            if(tab[i] == valeur) count++;
        }
    }

    return count;
}