//namespace doodleData
doodleData = {
    dates:[
        {entrainement:"1",date:"19 février 1983"},
        {entrainement:"2",date:"01 Mars 1983"},
        {entrainement:"3",date:"02 Janvier 2000"},
        {entrainement:"4",date:"17 Juin 2018"}
    ],
    presences: ["seb", "ju"],
    joueurs: [
        {entrainement: "1",nom:"seb",statut:"0"},
        {entrainement: "1",nom:"ju",statut:"2"},
        {entrainement: "2",nom:"mischael",statut:"3"},
        {entrainement: "2",nom:"jean",statut:"0"},
        {entrainement: "2",nom:"michel",statut:"1"},
        {entrainement: "2",nom:"alain",statut:"2"},
        {entrainement: "2",nom:"pierre",statut:"3"},
    ]
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


   //initialisation des infos à mettre dans la page
   ajouterData();

   //eventListener pour ouvrir le frontend .joueurs
   let uneDate = document.getElementsByClassName("uneDate");
   for(let i = 0; i<uneDate.length; i++) {
    uneDate[i].addEventListener("click", function() {
        ouvrirJoueurs(this);
     })
 }

   //tests de fonctions :
   
   /*
   let joueur = doodleData.joueurs[0];
   let div = document.getElementsByClassName("uneDate")[0];
   creerUneLigneParticipant(div, joueur);
   */
   let no = 1;
   marquerNbrePresents(no, 8);
   console.log(selectionnerDivUneDate(no));
   /**/
})



//ouvre la liste des joueurs par balise lors du click sur la balise
function ouvrirJoueurs(div) {   

    let hauteur = div.getElementsByClassName("joueurs")[0].offsetHeight;
    
    if(div.offsetHeight == "117") {
        let total = parseInt(hauteur) + 117;
        div.style.height = total + "px";
    }
    else div.style.height = "117px";
}


//retourne la ref de la div uneDate trouvée, si ne trouve pas retourne null
function selectionnerDivUneDate(no) {

    let div = null;
    //no est l'id de l'entrainement

    //selection des div uneDate :
    let divs = document.getElementsByClassName("uneDate");

    let trouve = false;

    for(let i = 0; i<divs.length; i++) {    
        if(divs[i].attributes["data-no"].value == no) {
            trouve = true;
            div = divs[i];
        }
    }
    if(!trouve) console.log("pas de no de div correspondant à " + no);

    return div;
}

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
            marquerNbrePresents(date.entrainement);
            colorierCarreNbreJoueurs(date.entrainement);
        })

        //boucler sur le nbre de div suivante ->
        //calculernbrePresents(document.getElementsByClassName("uneDate")[1]);
    }
}

function creationConteneurDates() {

    let row = document.createElement("div");
    row.className = "row conteneurDates";
    row.id = "conteneurDates";

    document.getElementById("app").appendChild(row);

}

function creerCarreNbreJoueurs(div) {

    let carre = document.createElement("div");
    carre.className = "carreNbreJoueurs";

    div.appendChild(carre);
}

function colorierCarreNbreJoueurs(no) {

    let div = selectionnerDivUneDate(no);
    let nbre = calculernbrePresents(div);
    let carre = div.getElementsByClassName("carreNbreJoueurs")[0];

    if(nbre >= 8) carre.style.borderLeftColor = "green";
    else carre.style.borderLeftColor = "red";
    
}

function creerUneDate(date) {

    //date est un objet composé du numero d'entrainement et de la date
    //date.entrainement, date.date

    //container à attacher à la div #conteneurDates
    let conteneurDates = document.getElementById("conteneurDates");

    let col = document.createElement("div");
    col.className = "col-sm-12 col-md-6 col-lg-4";
    col.setAttribute("data-no", date.entrainement);

    let div = document.createElement("div");
    div.className = "container uneDate";
    div.setAttribute("data-no", date.entrainement);    

    let inputDate = document.createElement("input");
    inputDate.setAttribute("readonly", "readonly");
    inputDate.setAttribute("type", "text");
    inputDate.value = date.date;

    let inputNbreJoueurs = document.createElement("input");
    inputNbreJoueurs.setAttribute("readonly", "readonly");
    inputNbreJoueurs.setAttribute("type", "text");
    inputNbreJoueurs.className = "nbreParticipants";

    //ancre pour les joueurs et leurs statuts
    let ancreJoueurs = document.createElement("div");
    ancreJoueurs.className = "joueurs";

    div.appendChild(inputDate);
    div.appendChild(inputNbreJoueurs);
    div.appendChild(ancreJoueurs);
    creerCarreNbreJoueurs(div);
    
    //date.entrainement correspond au no d'entrainement
    attacherPresences(ancreJoueurs, date.entrainement);

    col.appendChild(div);    
    conteneurDates.appendChild(col);
    
}

//récupère une div et attache tous les joueurs de la bdd associés à la clé de cette div
function attacherPresences(div,no) {

    //tab des données des joueurs
    let joueurs = doodleData.joueurs;   

    //compteur de joueurs inscrits
    let count = 0;

    joueurs.forEach(joueur => {

        if(joueur.entrainement == no) {

            count++;

            creerUneLigneParticipant(div, joueur);
        }
    })
    //si pas d'inscrits on marque "aucun inscrit"
    if(count==0) {
        let p = document.createElement("p");
        p.innerHTML = "aucun inscrit";
        p.className = "aucunInscrit";

        div.appendChild(p);
    }
}

//permet de rajouter à une div (un entrainement) le nom et le statut d'un joueur
function creerUneLigneParticipant(div, joueur) {
    
    //div est l'ancre à laquelle on append le joueur
    //joueur est un objet contenant les attributs du joueur
    let classeStatuts = ["present", "retard", "incertain", "absent"];
    let statuts = ["présent", "à la bourre", "incertain", "absent"];

    let row = document.createElement("div");
    row.className = "row";

    let containerNom = document.createElement("div");
    containerNom.className = "col-5";

    let containerStatut = document.createElement("div");
    containerStatut.className = "col-7";

    let nom = document.createElement("input");
    nom.setAttribute("type", "text");
    nom.setAttribute("readonly", "readonly");
    nom.className = classeStatuts[joueur.statut];
    nom.value = joueur.nom;

    //ajouter son statut
    
    let statut = document.createElement("input");
    statut.setAttribute("type", "text");
    statut.setAttribute("readonly", "readonly");
    statut.setAttribute("data-statut", joueur.statut);
    statut.className = "statut " + classeStatuts[joueur.statut];
    statut.value = statuts[joueur.statut];

    //mettre un evenlistener click pour mettre à jour son statut

    containerNom.appendChild(nom);
    containerStatut.appendChild(statut);

    row.appendChild(containerNom);
    row.appendChild(containerStatut);

    //div.appendChild(row);
    div.appendChild(row);

}

//calcule et retoure le nbre de participants (presents et en retard)
function calculernbrePresents(div) {

    //dans le DOM 2 inputs par joueur ont la même classe
    //donc pour avoir le nbre de joueurs on doit diviser par 2
    //pas de risque car il ne peut pas y avoir de nbres impairs dans le DOM
    let presents = div.getElementsByClassName("present").length;
    let retards = div.getElementsByClassName("retard").length;

    let total = (presents + retards) /2;
    
    //console.log(presents + retards);
    return total;
}

function marquerNbrePresents(noDeDiv) {
    
    let div = selectionnerDivUneDate(noDeDiv);

    let nbre = calculernbrePresents(div);

    let input = div.getElementsByClassName("nbreParticipants")[0];

    let orthographe = "présent";

    if(nbre >= 2) orthographe = orthographe + "s";

    input.value = nbre + " " + orthographe;
}

function btnInscription() {

    let container = document.createElement("div");
    container.className = "btnInscription";

    let btnInscrire = document.createElement("button");
    btnInscrire.className = "btn";
    btnInscrire.innerHTML = "s'inscrire !";

    //création des hr
    //let hr1 = document.createElement("hr");
    let hr2 = document.createElement("hr");

    btnInscrire.addEventListener("click", creerPageInscription);

    //container.appendChild(hr1);
    container.appendChild(btnInscrire);
    container.appendChild(hr2);

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
    
    let tab = div.childNodes;
    //console.log(tab);

    //si on trouve l'ancre appDates de la div
    tab.forEach(element => {
        if(element.id == "appDates") {
            //attache toutes les dates de doodle.dates à div #appDates
            attacherDates(element, doodleData.dates);
        };
    });
}

function attacherDates(noeud, tabDesDates) {

    let row = document.createElement("div");
    row.className = "row";

    tabDesDates.forEach(element => {
        //element.date correspond à une date format String
        let date = element.date;

        let input = document.createElement("input");
        input.className = "date";
        input.setAttribute("type", "text");
        input.setAttribute("value", date);
        input.setAttribute("readonly", "readonly");

        let col = document.createElement("div");
        col.className = "conteneurDiv col-sm-12 col-md-6 col-lg-4";

        //on place la date en attribut data-no pour sélectionner par la suite le contenu
        //de cette div
        let div = document.createElement("div");
        div.className = "presences";
        div.setAttribute("id", "inscription" + date);
        div.setAttribute("data-no", date);
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