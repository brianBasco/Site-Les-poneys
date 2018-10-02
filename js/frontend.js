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

    document.querySelectorAll(".querySelect").forEach(el => {
        el.addEventListener("click", function() {
            //Check si les autres balises ne sont pas aussi ouvertes
            checkBalise(this);
        })
    })
    
    
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
            //construire input
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("value", el.innerHTML);

            div.appendChild(input);

        }
    });

    let root = document.getElementById("votes");
    let ancre = document.getElementById("finDesVotes");

    root.insertBefore(div, ancre);

    document.querySelector("#fermerVotes").addEventListener("click",
        detruireVotes);
}

function detruireVotes() {
    
    let div = document.getElementById("listeVotes");
    let root = document.getElementById("votes");
    root.removeChild(div);

    document.querySelector("#fermerVotes").removeEventListener("click",
        detruireVotes);
    
}

function checkBalise(element) {
    console.log("checked");
    document.querySelectorAll(".querySelect").forEach(el => {
        if(el.checked && el.id != element.id) el.checked = false;
    })
}