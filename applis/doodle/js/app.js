//namespace doodleData
doodleData = {
    dates:["19 février 1983"],
    presences: ["seb", "ju"]
}

document.addEventListener("DOMContentLoaded", function (event) {

    /*
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
    */
   let btnAjouter = document.getElementById("btnAjouter");
   btnAjouter.addEventListener("click", function(event) {
        ouvrirPageAjout();
   })

   document.getElementById("fermerPageAjout").addEventListener("click", function(event) {
       fermerPageAjout();
   })

   ajouterData();
   btnInscription(); 
   creerUneDate(doodleData.dates);

   
})

function ouvrirPageAjout() {

    let div = $("#pageAjout");
    div.addClass("ouverte");
}

function fermerPageAjout() {

    let div = $("#pageAjout");
    div.removeClass("ouverte");
}

function ajouterData() {

    let affichage = "il y a des doodles";
    let dates = doodleData.dates;

    if(dates.length == 0) affichage = "pas de doodle";
    else affichage = dates[0];

    let p = document.createElement("p");
    p.innerHTML = affichage;

    document.getElementById("app").appendChild(p);
}

function creerUneDate(date) {

    //container à attacher à la div #app

    let container = document.createElement("div");
    container.className = "container uneDate";

    let inputDate = document.createElement("input");
    inputDate.setAttribute("readonly", "readonly");
    inputDate.setAttribute("type", "text");
    inputDate.value = date;

    let inputNbreJoueurs = document.createElement("input");
    inputNbreJoueurs.setAttribute("readonly", "readonly");
    inputNbreJoueurs.setAttribute("type", "text");
    inputNbreJoueurs.value = "nbre de participants";

    //test
    container.appendChild(inputDate);
    container.appendChild(inputNbreJoueurs);

    document.getElementById("app").appendChild(container);

}

function btnInscription() {

    let container = document.createElement("div");
    container.className = "container btnInscription";

    let btnInscrire = document.createElement("button");
    btnInscrire.className = "btn";
    btnInscrire.innerHTML = "s'inscrire !";

    container.appendChild(btnInscrire);

    document.getElementById("app").appendChild(container);
}

