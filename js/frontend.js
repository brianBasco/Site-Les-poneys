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
            ouvrirJoueur(this);
    })
});
    
    document.querySelectorAll(".suppr").forEach(element => {
        element.addEventListener("click", function() {
            demandeDeSuppression(this);
        })
    })
    
  });


function fermerJoueurs(element) {

    let num = element.getAttribute("data-match");
    let div = document.getElementById("joueurs" + num);
    //console.log(num);
    
    div.style.maxHeight = "0px";
    setTimeout(function() {
        div.style.opacity = 0;
        div.style.display = "hidden";
    }, 1100);
}

function ouvrirJoueurs(element) {
    
    let num = element.getAttribute("data-match");
    let div = document.getElementById("joueurs" + num);

    div.style.maxHeight = "initial";
    div.style.display = "block";    
    let hauteur = div.offsetHeight;
    div.style.maxHeight = "0px";
    setTimeout(function() {
        div.style.opacity = 1;
        div.style.maxHeight = hauteur + "px";
    }, 10);
}


function afficherNbreParticipants(element) {
   
    let numMatch = element.getAttribute("data-match");
    let div = document.getElementById("participants" + numMatch);

    calculerParticipants(numMatch, div);
}

function calculerParticipants(numMatch, div){
    let count = 0;
    document.querySelectorAll(".input" + numMatch).forEach(el => {
        if(el.checked) count ++;
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

function ouvrirJoueur(element) {

    let div = document.getElementById("gestionJoueur");
    div.style.display = "block";
    //nosql
    console.log("sql : " + element.getAttribute("data-joueur"));
    //noMatch
    let noMatch = element.getAttribute("data-match");
    console.log("numMatch : " +noMatch);
    //noJoueur
    let noJoueur = element.getAttribute("data-no");
    console.log("noJoueur : " + noJoueur);
    //nomjoueur
    console.log("nom : " + element.innerHTML);
    let nomjoueur = element.innerHTML;
    //presence
    //commentaire

    let divJoueur = document.getElementById("nomJoueur");
    divJoueur.value = nomjoueur;

    let url = "index.php?id=" + noJoueur;
    console.log(url);
    //location = url;
    

    construireVotes(noMatch, noJoueur);

}

function construireVotes(numMatch, numJoueur) {

    let div = document.createElement("div");
    div.setAttribute("id", "listeVotes");
   

    document.querySelectorAll(".input" + numMatch).forEach(el => {
        let num = el.getAttribute("data-no");
        if(numJoueur != num) {
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

            div.appendChild(label);

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