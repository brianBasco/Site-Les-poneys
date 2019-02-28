//namespace doodleData
doodleData = {
    dates:["19 février 1983", "01 Mars 1983", "02 Janvier 2000", "17 Juin 2018"],
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

    btnInscrire.addEventListener("click", creerPageInscription);

    container.appendChild(btnInscrire);

    document.getElementById("app").appendChild(container);
}

let creerPageInscription = function() {

    let div = document.createElement("div");
    div.className = "pageInscription";
    div.setAttribute("id", "pageInscription");

    ajouterContenus(div);
    ajouterDates(div);

    document.getElementById("app").appendChild(div);
    
    setTimeout(function() {
        div.className = "pageInscription ouverte";
    }, 300)
    
}

let detruirePageInscription = function() {

    let app = document.getElementById("app");

    let div = document.getElementById("pageInscription");
    div.className = "pageInscription";

    setTimeout(function() {
        app.removeChild(div);
    }, 1000)
    
}

function ajouterContenus(div) {

    let retourInfos = document.createElement("div");
    retourInfos.setAttribute("id", "retourInfos");
    retourInfos.className = "container retourInfos";

    let btnFermer = document.createElement("button");
    btnFermer.className = "btn btn-danger btn-fermer comics";
    btnFermer.innerHTML = "X";
    btnFermer.addEventListener("click", detruirePageInscription);

    // Input du nom
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "nom");

    let containerInput = document.createElement("div");
    containerInput.className = "container nom";
    containerInput.appendChild(input);

    //Validation
    let btnValider = document.createElement("button");
    btnValider.className = "btn btn-success";
    btnValider.innerHTML = "valider";
    btnValider.addEventListener("click", finaliserInscription);

    let containerValider = document.createElement("div");
    containerValider.className = "container validation";
    containerValider.appendChild(btnValider);

    //Ancre pour attacher les dates
    let appDates = document.createElement("div");
    appDates.setAttribute("id", "appDates");
    appDates.className = "container appDates";

    div.appendChild(btnFermer);
    div.appendChild(containerInput);
    div.appendChild(appDates);
    div.appendChild(containerValider);
    div.appendChild(retourInfos);
}

let finaliserInscription = function(event) {

    //requête AJAX enregistrement BD

    //retour Infos dans la div pour savoir si l'enregistrement s'est bien passé

    //Si enregistrement OK, envoi Mail à Marie
    let info  = document.createElement("p");
    info.innerHTML = "enregistré";
    document.getElementById("retourInfos").appendChild(info);

}

function ajouterDates(div) {

    //let appDates = document.getElementById("appDates");

    let tab = div.childNodes;
    console.log(tab);

    tab.forEach(element => {
        if(element.id == "appDates") {
            //attache toutes les dates de doodle.dates
            attacherDates(element, doodleData.dates);
        };
    });

    let p = document.createElement("p");
    p.innerHTML = "hmmmm";

    //appDates.appendChild(p);
}

function attacherDates(noeud, tabDesDates) {

    tabDesDates.forEach(element => {
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("value", element);
        input.setAttribute("readonly", "readonly");

        let row = document.createElement("div");
        row.className = "container row";

        let div = document.createElement("div");
        div.className = "container col-3";
        div.appendChild(input);

        //attacher btn de présence
        for(let i = 0; i<4; i++) {
            let btn = document.createElement("input");
            switch(i) {
                case 0: btn.className = "absent";
                case 1: btn.className = "présent";
                case 2: btn.className = "à la bourre";
                case 3: btn.className = "incertain";
            }
            div.appendChild(btn);
        }

        row.appendChild(div);
        noeud.appendChild(row);
    });
};