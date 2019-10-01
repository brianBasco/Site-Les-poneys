//variables globales, namespace lesScores
var LesScores = {
    base : 0,
    unDecalage : 225
};

document.addEventListener("DOMContentLoaded", function (event) {

    $ajaxUtils.sendGetRequest("php/queryScores.php",
        function (request) {

            let reponse = request.responseText;

            //reponse reçoit le tableau de la bdd des scores
            let tableau = JSON.parse(reponse);

            construireScoreBoard(tableau);

        })

    document.querySelector("#previous").addEventListener("click", function () {
        decalerScores(LesScores.unDecalage);
    })

    document.querySelector("#next").addEventListener("click", function () {
        decalerScores(-LesScores.unDecalage);
    })
})

function decalerScores(decalage) {
    let scores = document.querySelectorAll(".scoreBoardMatch");
    let res = (LesScores.base + decalage);
    for (let i = 0; i < scores.length; i++) {
        scores[i].style.left = res + "px";
    }
    LesScores.base = res;
}

function construireScoreBoard(tab) {

    let scores = document.getElementById("scoreBoard_contenu");
    scores.style.width = (tab.length * 225) + "px";

    for (let i = 0; i < tab.length; i++) {

        let match = tab[i];

        let div = document.createElement("div");
        div.className = "scoreBoardMatch";
        div.setAttribute("data-no", match.num_match);

        let date = document.createElement("input");
        date.setAttribute("type", "text");        
        date.setAttribute("readonly", "readonly");
        date.className = "date";
        date.value = dateFormatFr(match.date_match);


        let talence = document.createElement("input");
        talence.setAttribute("type", "text");
        talence.setAttribute("readonly", "readonly");
        talence.className = "scoreBoardNom";
        talence.value = "talence";

        let nous = document.createElement("input");
        nous.setAttribute("type", "text");
        nous.setAttribute("readonly", "readonly");
        nous.className = "score";
        nous.value = match.nous;

        let nom = document.createElement("input");
        nom.setAttribute("type", "text");
        nom.setAttribute("readonly", "readonly");
        nom.id = "score_" + match.num_match;
        nom.className = "scoreBoardNom";
        nom.value = match.nom;

        let eux = document.createElement("input");
        eux.setAttribute("type", "text");
        eux.setAttribute("readonly", "readonly");
        eux.className = "score";
        eux.value = match.eux;

        div.appendChild(date);
        div.appendChild(document.createElement("hr"));
        div.appendChild(talence);
        div.appendChild(nous);
        div.appendChild(nom);
        div.appendChild(eux);

        div.addEventListener("click", function () {
            //decalerScores(-LesScores.unDecalage);
            resultatDesVotes(match.num_match);
        })

        scores.appendChild(div);
    }
}

function dateFormatFr(date) {
    return date.split("-").reverse().join("-");
}

function creerBalise(type, attributs) {

    let balise = document.createElement(type);

    if (attributs != null) {
        for (let i = 0; i < attributs.length; i++) {
            balise.setAttribute(attributs[i][0], attributs[i][1]);
        }
    }

    return balise;
}

function resultatDesVotes(num_match) {

    let div = document.createElement("div");
    
    div.setAttribute("id", "scoreBoard_votes");
    div.className = "scoreBoard_votes";

    //bouton fermer
    let fermer = document.createElement("button");
    fermer.innerHTML = "X";
    fermer.addEventListener("click", function() {
        fermerResultatDesVotes();
    })

    div.appendChild(fermer);   

    document.body.appendChild(div);
    
    getStars(num_match);
}

function fermerResultatDesVotes() {

    let votes = document.getElementById("scoreBoard_votes");

    document.body.removeChild(votes);
}


function ajouterStars(div, tableau) {

    let container = document.createElement("div");
    container.className = "container votes_joueurs";
    
    let titre  = document.createElement("h2");
    titre.innerHTML = "une action de Dingue !";

    container.appendChild(titre);
    
    //1 pour indiquer à la fonction des symboles lequel mettre
    creerJoueurResultatDesVotes(tableau, container, 1);
    div.appendChild(container);

}

function ajouterZippers(div, tableau) {

    let container = document.createElement("div");
    container.className = "container votes_joueurs";
    
    let titre  = document.createElement("h2");
    titre.innerHTML = "un Zip, c'est cadeau aussi...";

    container.appendChild(titre);
    
    //0 pour indiquer à la fonction des symboles lequel mettre
    creerJoueurResultatDesVotes(tableau, container, 0);
    div.appendChild(container);

}

function getStars(num_match) {

    
    $ajaxUtils.sendGetRequest("php/queryAction.php?num_match=" + num_match,
        function (request) {

            let reponse = request.responseText;

            //reponse reçoit le tableau de la bdd des scores
            let tableau = JSON.parse(reponse);
             
            //Ajouter les joueurs
            let div = document.getElementById("scoreBoard_votes");
            ajouterStars(div, tableau);

            //Les stars sont récupérées, on peut lancer les zippers
            //Zippers commentés pour ne pas lancer la fonction
            //getZippers(num_match);            

        })
     

    //location = "php/queryAction.php?num_match=" + num_match;
        
}

function getZippers(num_match) {
    
    $ajaxUtils.sendGetRequest("php/queryCagade.php?num_match=" + num_match,
        function (request) {

            let reponse = request.responseText;

            //reponse reçoit le tableau de la bdd des scores
            let tableau = JSON.parse(reponse);
             
            //Ajouter les joueurs
            let div = document.getElementById("scoreBoard_votes");
            ajouterZippers(div, tableau);
        })
}

function creerJoueurResultatDesVotes(tab, container, flag) {

    for(let i =0; i<tab.length; i++) {

        let joueur = document.createElement("div");
        joueur.className = "container unJoueur";

        let row = document.createElement("div");
        row.className = "row";

        let photo = document.createElement("div");
        photo.className = "col-4";

        let img = document.createElement("img");
        img.setAttribute("src", "css/images/joueurs/" + tab[i][0]);
        img.className = "photo";

        row.appendChild(img);

        //Ajout des étoiles
        let nbreSymboles = tab[i][1]; 
        ajoutDessymboles(nbreSymboles, row, flag);

        joueur.appendChild(row);        
        container.appendChild(joueur);
    }
}

function ajoutDessymboles(nbre, row, flag) {
    
    //création conteneur des étoiles
    let star_container = document.createElement("div");
    star_container.className = "col-8 container_etoiles";

    //création des étoiles et rattachement au container
    for(let i = 0; i<nbre; i++) {
        let etoile = document.createElement("img");
        if(flag == 1) etoile.setAttribute("src", "css/images/star.png");
        else etoile.setAttribute("src", "css/images/banana.png");
        etoile.className = "star";
        star_container.appendChild(etoile);
    }

    //rattachement du container étoiles à joueur
    row.appendChild(star_container);
}