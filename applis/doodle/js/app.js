//namespace doodleData
doodleData = {
    dates:["19 février 1983", "01 Mars 1983", "02 Janvier 2000", "17 Juin 2018"],
    presences: ["seb", "ju"],
    joueurs: [
        {entrainement: "1",nom:"seb",statut:"0"},
        {entrainement: "1",nom:"ju",statut:"2"},
        {entrainement: "2",nom:"mischael",statut:"3"}]
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
   //creerUneDate(doodleData.dates);

   
})

function ouvrirPageAjout() {

    let div = $("#pageAjout");
    div.addClass("ouverte");
}

function fermerPageAjout() {

    let div = $("#pageAjout");
    div.removeClass("ouverte");
}


//#app affichage ou non des dates, s'il y a des dates dans la table
function ajouterData() {

    let dates = doodleData.dates;

    if(dates.length == 0) {

        let p = document.createElement("p");
        p.innerHTML = "pas de doodle";
        document.getElementById("app").appendChild(p);
    }
    else {
        btnInscription();
        creationConteneurDates();

        dates.forEach(date => {
            creerUneDate(date);
        })
    }
}

function creationConteneurDates() {

    let row = document.createElement("div");
    row.className = "row conteneurDates";
    row.id = "conteneurDates";

    document.getElementById("app").appendChild(row);

}


function creerUneDate(date) {

    //container à attacher à la div #conteneurDates
    let conteneurDates = document.getElementById("conteneurDates");

    let col = document.createElement("div");
    col.className = "col-sm-12 col-md-6 col-lg-4";

    let container = document.createElement("div");
    container.className = "container uneDate";
    container.setAttribute("data-no", "1");

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

    attacherPresences(container);

    col.appendChild(container);
    conteneurDates.appendChild(col);
    
}

//récupère une div et attache tous les joueurs de la bdd associés à la clé de cette div
function attacherPresences(div) {

    //tab des données des joueurs
    let joueurs = doodleData.joueurs;    

    //div.no correspond au No d'entrainement dans la bdd
    //joueur.entrainement correspond au No d'entrainement dans la bdd
    let no = div.attributes["data-no"].value;
    //console.log(no);

    joueurs.forEach(joueur => {

        if(joueur.entrainement == no) {

            let row = document.createElement("div");
            row.className = "row";

            let containerNom = document.createElement("div");
            containerNom.className = "col-5";

            let containerStatut = document.createElement("div");
            containerStatut.className = "col-7";

            let nom = document.createElement("input");
            nom.setAttribute("type", "text");
            nom.setAttribute("readonly", "readonly");
            nom.value = joueur.nom;

            //ajouter son statut
            let statut = document.createElement("input");
            statut.setAttribute("type", "text");
            statut.setAttribute("readonly", "readonly");
            statut.setAttribute("data-statut", joueur.statut);
            statut.className = "statut";

            //mettre un evenlistener click pour mettre à jour son statut

            containerNom.appendChild(nom);
            containerStatut.appendChild(statut);

            row.appendChild(containerNom);
            row.appendChild(containerStatut);

            div.appendChild(row);

        }
    })
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

    let row = document.createElement("div");
    row.className = "row";

    tabDesDates.forEach(element => {
        //element correspond à une date format String
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("value", element);
        input.setAttribute("readonly", "readonly");

        let col = document.createElement("div");
        col.className = "col-sm-12 col-md-6 col-lg-4";

        //on place la date en attribut data-no pour sélectionner par la suite le contenu
        //de cette div
        let div = document.createElement("div");
        div.setAttribute("id", "inscription" + element);
        div.setAttribute("data-no", element);
        div.appendChild(input);

        //construction des boutons present absent retard incertain
        construireBoutonsSelection(div);

        col.appendChild(div);
        row.appendChild(col);
        
    });
    
    noeud.appendChild(row);
};

function construireBoutonsSelection(div) {


    for(let i = 0; i<4; i++) {

    //construire label
    let label = document.createElement("label");
    label.setAttribute("class", "switch");
    //construire input
    //i = 0 present, 1 en retard, 2 incertain, 3 absent 
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("numero", i);
    input.setAttribute("data-no", "en attente,amodifier");
    input.className = "queryPresence";
    if(i == 3) input.checked = true;

    //
    let cle = div.id;
    input.addEventListener("click", function() {            
        checkClick(this, cle);
    });
    
    //construire span
    let span = document.createElement("span");
    switch(i) {
        case 0: {
            span.className = "slider present";
            break;
            }
        case 1: {
            span.className = "slider retard";
            break;
            }
        case 2: {
            span.className = "slider incertain";
            break;
            }
        case 3: {
            span.className = "slider absent";
            break;
            }
    }

    label.appendChild(input);
    label.appendChild(span);

    div.appendChild(label);
    }
}

function checkClick(bouton, cle) {

    //document.querySelectorAll("");
    let div = document.getElementById(cle);

    let inputs = div.getElementsByClassName("queryPresence");

    for(let i = 0; i<inputs.length; i++) {
        if(inputs[i].checked == true) inputs[i].checked = false;
    }

    //pour empécher de déselectionner une balise checked et se retrouver
    //sans aucune balise checked
    if(bouton.checked == false) bouton.checked = true;

}