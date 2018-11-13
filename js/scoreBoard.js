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
        decalerScores(-LesScores.unDecalage);
    })

    document.querySelector("#next").addEventListener("click", function () {
        decalerScores(LesScores.unDecalage);
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
        nous.className = "score";
        nous.value = match.nous;

        let nom = document.createElement("input");
        nom.setAttribute("type", "text");
        nom.id = "score_" + match.num_match;
        nom.className = "scoreBoardNom";
        nom.value = match.nom;

        let eux = document.createElement("input");
        eux.setAttribute("type", "text");
        eux.className = "score";
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

