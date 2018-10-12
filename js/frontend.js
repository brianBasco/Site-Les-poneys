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

    document.querySelectorAll(".nom").forEach(element => {
        element.addEventListener("click", function() {
            //ouvrir le container;
            ouvrirGestionJoueur(this);
    })
});
    
    document.querySelectorAll(".suppr").forEach(element => {
        element.addEventListener("click", function() {
            demandeDeSuppression(this);
        })
    })

    document.querySelectorAll(".btn-mail").forEach(element => {
        element.addEventListener("click", function() {
            ouvrirGestionMails(this);
        })
    })  
    

    //Bouton du header
    document.querySelector("#menu_bouton").addEventListener("click", toggleMenu);

    //click du menu
    document.querySelector("#ajouterMatch").addEventListener("click", ouvrirAjoutMatch);
    document.querySelector("#gestionEquipe").addEventListener("click", ouvrirGestionEquipe);
    document.querySelector("#appliScores").addEventListener("click", ouvrirAppliScores);
    document.querySelector("#appliPlacements").addEventListener("click", ouvrirAppliPlacements);
    
  });


function fermerJoueurs(element) {

    let num = element.getAttribute("data-match");
    let div = document.getElementById("joueurs" + num);
    //console.log(num);
    
    div.style.paddingBottom = "0";
    div.style.maxHeight = "0px";
    setTimeout(function() {
        div.style.opacity = 0;        
        div.style.display = "hidden";
    }, 1500);
}

function ouvrirJoueurs(element) {
    
    let num = element.getAttribute("data-match");
    let div = document.getElementById("joueurs" + num);

    div.style.maxHeight = "initial";
    div.style.display = "block"; 
    div.style.paddingBottom = "10px";   
    let hauteur = div.offsetHeight;
    div.style.maxHeight = "0px";
    setTimeout(function() {
        div.style.opacity = 1;       
        div.style.maxHeight = hauteur + "px";
    }, 10);
}


function afficherNbreParticipants(element) {
   
    let numMatch = element.getAttribute("data-match");   

    calculerParticipants(numMatch);
}

function calculerParticipants(numMatch){

    let div = document.getElementById("participants" + numMatch);

    let count = 0;
    document.querySelectorAll(".input" + numMatch).forEach(el => {
        let presence = el.getAttribute("data-presence");
        if(presence == 1 || presence == 2) count ++;
    });

    let joueur = " joueur";
    
    if(count > 1) joueur+="s";

    div.innerHTML = count + joueur;
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

        //location = location;
    }
}

function ouvrirGestionJoueur(element) {

    let div = document.getElementById("gestionJoueur");
    div.style.display = "block";

    location = "#gestionJoueur";

    //nomjoueur
    console.log("nom : " + element.innerHTML);
    let nomjoueur = element.innerHTML;

    //MAJ du frontend presence
    let presence = element.getAttribute("data-presence");
    affichagePresence(presence); 
    //commentaire

    let divJoueur = document.getElementById("nomJoueur");
    divJoueur.value = nomjoueur;

    //no de match
    let noMatch = element.getAttribute("data-match");
    console.log("numMatch : " +noMatch);
    //noJoueur
    let noJoueur = element.getAttribute("data-no");
    console.log("noJoueur : " + noJoueur);
    //ligne sql
    let nosql = element.getAttribute("data-sqlno");

    divJoueur.setAttribute("data-nosql", nosql);
    divJoueur.setAttribute("data-match", noMatch);
    divJoueur.setAttribute("data-no", noJoueur);

    //Affichage de la photo
    let photo = document.getElementById("photoJoueur");
    let photoPath = element.getAttribute("data-photo");
    photo.src = "css/images/joueurs/" + photoPath;

    construireVotes(noMatch, noJoueur);   
    enregistrerModifs();

}

function construireVotes(numMatch, numJoueur) {

    let div = document.createElement("div");
    div.setAttribute("id", "listeVotes");
    div.className = "row";
   

    document.querySelectorAll(".input" + numMatch).forEach(el => {
        let num = el.getAttribute("data-no");
        if(numJoueur != num) {
            //construire la div container
            let divContainer = document.createElement("div");
            divContainer.className = "col-sm-12 col-md-6 col-lg-4";
            //construire label
            let label = document.createElement("label");
            label.setAttribute("class", "switch");
            //construire input
            let input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("class", "queryVote");
            input.setAttribute("data-no", num);
            //construire span
            let span = document.createElement("span");
            span.className = "slider vote";
            span.innerHTML = el.innerHTML;
                   
            label.appendChild(input);
            label.appendChild(span);

            divContainer.appendChild(label);

            div.appendChild(divContainer);

        }
    });

    let root = document.getElementById("votes");
    let ancre = document.getElementById("finDesVotes");

    root.insertBefore(div, ancre);
    
    document.querySelector("#fermerGestion").addEventListener("click",
        detruireVotes);

    document.querySelectorAll(".querySelect").forEach(el => {
        el.addEventListener("click", function() {
            //Check si les autres balises ne sont pas aussi ouvertes
           
            checkClick(this, "querySelect", "data-present");
        })
    })

   document.querySelectorAll(".queryVote").forEach(el => {
        el.addEventListener("click", function() {
            
            checkClick(this, "queryVote", "data-no");
        })
    });
}

function detruireVotes() {
    
    let div = document.getElementById("listeVotes");
    let root = document.getElementById("votes");
    root.removeChild(div);

    document.querySelector("#fermerGestion").removeEventListener("click",
        detruireVotes);

    document.querySelector("#enregisJoueur").removeEventListener("click", UpdateDb);

    let divGestion = document.getElementById("gestionJoueur");
    divGestion.style.display = "none";  
    
}


//on passe un attribut qui porte un numero, data-no - date-present
//Sélection de toutes les inputs avec la classe à vérifier
function checkClick(element, classe, attribut) {
    console.log("checked");
    let noElement = element.getAttribute(attribut);

    document.querySelectorAll("." + classe).forEach(el => {
        let noEl = el.getAttribute(attribut);
        if(el.checked && noElement != noEl) el.checked = false;
    })
}

function toggleMenu() {

    let div = document.getElementById("menu_deplie");
    let classes = div.classList;
    let ouvert = false;
    classes.forEach(element => {
        console.log(element);
        if(element == "ouvert") ouvert = true;
    
    });

    if(!ouvert) {        
        div.style.maxHeight = "400px";
        div.style.paddingTop = "30px";
        div.style.paddingBottom = "30px";
        div.className += " ouvert";
    }
    else {
        div.style.paddingBottom = "0";
        div.style.paddingTop = "0";        
        div.style.maxHeight = "0";                
        div.className = "menu_deplie";
    }    
}

function ouvrirAjoutMatch() {
    location = "pages/ajout/index.php";
}

function ouvrirAppliScores() {
    location = "applis/scores/index.html";
}

function ouvrirAppliPlacements() {
    location = "applis/placements/index.html";
}

function ouvrirGestionEquipe() {
    location = "pages/gestionEquipe/index.php";
}

function ouvrirGestionMails (element) {
    let numMatch = element.getAttribute("data-match");
    let url = "pages/mails/index.php?match=" + numMatch;    
    location = url; 
}

function enregistrerModifs(nosql) {

    document.querySelector("#enregisJoueur").addEventListener("click", UpdateDb); 
}

function UpdateDb() {
    let num_match = document.getElementById("nomJoueur").getAttribute("data-match");
    let nom_joueur = document.getElementById("nomJoueur").value;

    //update de la table commentaire, num_match, num_joueur
    let commentaire = document.getElementById("commentJoueur").value;
    let urlCommentaire;
    //si le commentaire n'est pas vide
    if(commentaire != "") {
        urlCommentaire = "php/updateCommentaire.php?commentaire=" + commentaire +
        "&num_match=" + num_match + "&nom_joueur=" + nom_joueur ;
        //requête ajax
        //location = urlCommentaire;
    }    

    //update de la table presence
    let presence;
    let nosql = document.getElementById("nomJoueur").getAttribute("data-nosql");

    document.querySelectorAll(".querySelect").forEach(element => {
        if(element.checked == true) presence = element.getAttribute("data-present");
    })

    if(presence == undefined) presence = 0;

    //requête AJAX update presence
    let urlPresence = "php/updatePresence.php?ligne=" + nosql + "&presence=" + presence;
    console.log(urlPresence);
    location = urlPresence;
    
    //MAJ du frontend nbre de participants
    calculerParticipants(num_match);
}

function affichagePresence(presence) {
    //remise à zero de l'affichage
    document.querySelectorAll(".querySelect").forEach(element => {
        element.checked = false;
    });
    //element present checked, si presence  = 0, rien n'est coché
    document.querySelectorAll(".querySelect").forEach(element => {
        let dataPresent = element.getAttribute("data-present");
        if(dataPresent == presence) element.checked = true;
    });
}

