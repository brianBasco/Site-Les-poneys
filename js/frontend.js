//variable globale, namespace Maposition
Maposition = {};

document.addEventListener("DOMContentLoaded",
  function (event) {

    let matchs = document.querySelectorAll(".match");
    for(let i = 0; i<matchs.length; i++) {
        afficherNbreParticipants(matchs[i]);
        colorerDiv(matchs[i]);
    }
   
    let moins = document.querySelectorAll(".eventMoins");
    for(let i = 0; i<moins.length; i++) {
        moins[i].addEventListener("click", function() {
            fermerJoueurs(this);
    })
    }

    let plus = document.querySelectorAll(".eventPlus");
    for(let i = 0; i<plus.length; i++) {
        plus[i].addEventListener("click", function() {
            ouvrirJoueurs(this);
    })
    }

    let nom = document.querySelectorAll(".eventNom");
    for(let i = 0; i<nom.length; i++) {
        nom[i].addEventListener("click", function() {
            ouvrirGestionJoueur(this);
    })
    }

    let btnMail = document.querySelectorAll(".btn-mail");
    for(let i = 0; i<btnMail.length; i++) {
        btnMail[i].addEventListener("click", function() {
            ouvrirGestionMails(this);
    })
    }

    let presences = document.querySelectorAll(".presence");
    for(let i= 0; i<presences.length; i++) {
        afficherPresence(presences[i]);
    }
       
    //Bouton du header
    document.querySelector("#menu_bouton").addEventListener("click", toggleMenu);

    //click du bouton de vote
    document.querySelector("#btn-voteAction").addEventListener("click", function(){
        voter("VoteAction")});

    document.querySelector("#btn-voteCagade").addEventListener("click", function(){
        voter("VoteCagade")});


    //affichage de la date du prochain match
    afficherDateMatch();
    
  });

  // ------------- Liste des fonctions ---------------- //

function getScroll() {
    return window.pageYOffset;
}


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
    let hauteur = div.clientHeight;
    div.style.maxHeight = "0px";
    setTimeout(function() {
        div.style.opacity = 1;       
        div.style.maxHeight = hauteur + "px";
    }, 10);
}


function afficherNbreParticipants(element) {
   
    console.log(element);
    let numMatch = element.getAttribute("data-match");   

    calculerParticipants(numMatch);
}

function calculerParticipants(numMatch){

    let div = document.getElementById("participants" + numMatch);

    let count = 0;
    
    let inputs = document.querySelectorAll(".input" + numMatch);
    for(let i = 0; i<inputs.length; i++) {
        let presence = inputs[i].getAttribute("data-presence");
        if(presence == 1 || presence == 2) count ++;
    }    

    let joueur = " joueur";
    
    if(count > 1) joueur+="s";

    div.innerHTML = count + joueur;
}



function ouvrirGestionJoueur(element) {

    Maposition.initiale = getScroll();

    let div = document.getElementById("gestionJoueur");

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

    construirePresence();
    construireVotes(noMatch, noJoueur, "queryVoteAction", "voteAction", "boulard");
    construireVotes(noMatch, noJoueur, "queryVoteCagade", "voteCagade", "bouse");   
    enregistrerModifs();

    div.style.display = "block";
    window.scrollTo(0,0);
}

function construireVotes(numMatch, numJoueur, selecteur, id, monType) {

    let div = document.createElement("div");
    div.className = "row";
   
    let inputs = document.querySelectorAll(".input" + numMatch);
    for(let i = 0; i<inputs.length; i++) {

        let num = inputs[i].getAttribute("data-no");
        //construire la div container
        let divContainer = document.createElement("div");
        divContainer.className = "col-sm-12 col-md-6 col-lg-4";
        //construire label
        let label = document.createElement("label");
        label.setAttribute("class", "switch");
        //construire input
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", selecteur);
        input.setAttribute("data-no", num);
        //construire span
        let span = document.createElement("span");
        span.className = "slider vote";

        if(numJoueur != num) span.innerHTML = inputs[i].innerHTML;
        else span.setAttribute("data-perso", monType);
                   
        label.appendChild(input);
        label.appendChild(span);

        divContainer.appendChild(label);

        div.appendChild(divContainer);
    }

    let root = document.getElementById(id);

    root.appendChild(div);
    console.log(root);

    let queryVotes = document.querySelectorAll("." + selecteur);
    for(let i = 0; i<queryVotes.length; i++) {
        queryVotes[i].addEventListener("click", function() {            
            //checkClick(this, selecteur, "data-no");
        });
    }
}
    
    
function construirePresence(){
    let querySelects = document.querySelectorAll(".querySelect");
    for(let i = 0; i<querySelects.length; i++) {
        querySelects[i].addEventListener("click", function() {
            //Check si les autres balises ne sont pas aussi ouvertes           
            checkClick(this, "querySelect", "data-present");
        });
    }
}

function detruireVotes() {       

   //let root = document.getElementById("votes");
    let divAction = document.getElementById("voteAction");
    let divCagade = document.getElementById("voteCagade");
    console.log(divAction);
    divAction.removeChild(divAction.childNodes[0]);
    divCagade.removeChild(divCagade.childNodes[0]);

    document.querySelector("#fermerGestion").removeEventListener("click",
        detruireVotes);

    document.querySelector("#enregisJoueur").removeEventListener("click", UpdateDb);
    document.querySelector("#enregisComment").removeEventListener("click", UpdateComment);

    let divGestion = document.getElementById("gestionJoueur");
    divGestion.style.display = "none";

    //Retour de la vue là où on a cliqué à la base
    
    window.scrollTo(0,Maposition.initiale);
    
    //effacement de commentaire
    document.getElementById("commentJoueur").value="";
    
    //Bouton de retour
    let retourPres = document.getElementById("retourPresence");    
    retourPres.value ="";    
    retourPres.style.display = "none";
}


//on passe un attribut qui porte un numero, data-no - date-present
//Sélection de toutes les inputs avec la classe à vérifier
function checkClick(element, classe, attribut) {
    console.log("checked");
    let noElement = element.getAttribute(attribut);

    let classes = document.querySelectorAll("." + classe);
    for(let i = 0; i<classes.length; i++) {
        let noEl = classes[i].getAttribute(attribut);
        if(classes[i].checked && noElement != noEl) classes[i].checked = false;
    }
}

function toggleMenu() {

    let div = document.getElementById("menu_deplie");
    let classes = div.classList;
    let ouvert = false;
    for(let i =0; i<classes.length; i++) {
    
        if(classes[i] == "ouvert") ouvert = true;
    
    };

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


function ouvrirGestionMails (element) {
    let numMatch = element.getAttribute("data-match");
    let url = "pages/mails/index.php?match=" + numMatch;    
    location = url; 
}

function enregistrerModifs() {

    document.querySelector("#enregisJoueur").addEventListener("click", UpdateDb);
    document.querySelector("#enregisComment").addEventListener("click", UpdateComment);
    document.querySelector("#fermerGestion").addEventListener("click",
    detruireVotes); 
}

function UpdateComment() {

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
          $ajaxUtils.sendGetRequest(urlCommentaire, 
          function (request) {
              
          let retour = request.responseText;
          let reponse = JSON.parse(retour); 
  
          let div = document.querySelector("#retourPresence");
          div.value = reponse[1];
          div.style.display = "block";
          
  
          //affichage du commentaire dans la div match
          if(reponse[0]){

            //UI on remet à vide l'input commentaire, cela évite aussi de dupliquer un commentaire
            //si l'utilisateur appuie plusieurs fois de suite sur Envoyer
            document.getElementById("commentJoueur").value = "";

              let DIVcommentaire = document.getElementById("commentaires" + num_match);
             
              let div = document.createElement("div");
              let nom = document.createElement("input");
              let comment = document.createElement("input");
              nom.setAttribute("type", "text");
              nom.setAttribute("readonly", "true");
              nom.setAttribute("value", nom_joueur);
              nom.className = "form-control nomComment";
              
              comment.setAttribute("type", "text");
              comment.setAttribute("readonly", "true");
              comment.setAttribute("value", commentaire);
              comment.className = "form-control contenuComment";
  
              div.appendChild(nom);
              div.appendChild(comment);
              DIVcommentaire.appendChild(div);
  
              let DIVmatch = document.getElementById("match" + num_match);
              ouvrirJoueurs(DIVmatch);
              }
  
        });
    }    
}

function UpdateDb() {
    let num_match = document.getElementById("nomJoueur").getAttribute("data-match");
    let nom_joueur = document.getElementById("nomJoueur").value;
    let no_joueur = document.getElementById("nomJoueur").getAttribute("data-no");

  

    //update de la table presence
    let presence;
    let nosql = document.getElementById("nomJoueur").getAttribute("data-nosql");

    let querySelects = document.querySelectorAll(".querySelect");
    for(let i =0; i<querySelects.length; i++){
        if(querySelects[i].checked == true) presence = querySelects[i].getAttribute("data-present");
    }

    if(presence == undefined) presence = 0;

    //requête AJAX update presence
    if(presence != 0) {
        let urlPresence = "php/updatePresence.php?ligne=" + nosql + "&presence=" + presence;

        $ajaxUtils
        .sendGetRequest(urlPresence, 
        function (request) {

            let retour = request.responseText;
            let reponse = JSON.parse(retour);   
            console.log(reponse);    
            let div  = document.querySelector("#retourPresence");
            div.value = reponse[1];
            div.style.display = "block";

            //si retour sans erreur
            if(reponse[0]){
            let nom = document.getElementById("joueur" + nosql);
            let input = document.getElementById("input" + nosql);

            nom.setAttribute("data-presence", presence);
            input.setAttribute("data-presence", presence);
            afficherPresence(input);
            calculerParticipants(num_match);
            }
            
            });
    }

  
}

function affichagePresence(presence) {
    //remise à zero de l'affichage
    let querySelects = document.querySelectorAll(".querySelect");

    for(let i = 0; i<querySelects.length; i++) {
    querySelects[i].checked = false;
    }
    //element present checked, si presence  = 0, rien n'est coché
   for(let i = 0; i<querySelects.length; i++) {
        let dataPresent = querySelects[i].getAttribute("data-present");
        if(dataPresent == presence) querySelects[i].checked = true;
    }
}

function afficherDateMatch() {

    let date = new Date();
    let dateDuJour = date.getTime();
    console.log("Date du jour : " + dateDuJour);
    //récup de l'écart min entre la date du jour et les dates
    //de tous les matchs si leur date > date du jour    
    
    let numMatch;
    let dates = [];

    let matchs = document.querySelectorAll(".match");
    //S'il y a des matchs
    if(matchs != null) {
        for(let i = 0; i<matchs.length; i++){

            let dateMatch = matchs[i].getAttribute("data-date");
            dateMatch = dateMatch.split('-');
            dateMatch.reverse();
            dateMatch = dateMatch.join('-');
            let heureMatch = matchs[i].getAttribute("data-heure");

            dateMatch += "T23:59:00";
            dateMatch = new Date(dateMatch);
            let DateMatch = dateMatch.getTime();

            if(DateMatch > dateDuJour) {
                
                numMatch = matchs[i].getAttribute("data-match");
                console.log("num de match " + numMatch);
                dates.push([DateMatch, numMatch]);
                
                }
            }
        }
    //S'il ya des matchs à jouer
     if(dates[0] != undefined) {
         console.log(dates);
        let min = dates[0][0] - dateDuJour;
        for(let i = 0; i<dates.length;i++) {
        
            let ecart = dates[i][0] - dateDuJour;
            if(ecart <= min) {
                    min = ecart;
                    numMatch = dates[i][1];
            }
        }
    }  

    if(numMatch != undefined) {
        let tab_jour=["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        let tab_mois=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];

        let div = document.getElementById("prochainMatch");
        let dateMatch = document.getElementById("match" + numMatch).getAttribute("data-date");

        let dateDiv = dateMatch.split("-");
        dateDiv = new Date(dateDiv.reverse());

        let num = dateDiv.getDate();
        let jour  = tab_jour[dateDiv.getDay()];        
        let mois = tab_mois[dateDiv.getMonth()];
        
        let equipe = document.getElementById("nom" + numMatch).innerHTML;
        
        if(jour != undefined) div.innerHTML = "Prochain match le " + jour + " " + num + " " + mois + " contre " + equipe;
        else div.innerHTML = "Prochain match le " + dateMatch + " contre " + equipe;
    }
}

function colorerDiv (el) {

    let date = new Date();
    date = date.toISOString();
    //let dateDuJour = date.getTime();

    let dateMatch = el.getAttribute("data-date");
    dateMatch = dateMatch.split('-');
    dateMatch.reverse();
    dateMatch = dateMatch.join('-');

    dateMatch += "T23:59:00";

    if(dateMatch < date) {
        let image = document.createElement("img");
        image.setAttribute("src", "css/images/expired.png");
        image.className = "expired";

        el.appendChild(image);
    }
}


function afficherPresence(element) {
    switch(element.getAttribute("data-presence")){
        case("0") :
            element.value = "no vote";
            break;
        
        case("1") :
            element.value = "présent";
            break;

        case("2") :
            element.value = "à la bourre";
            break;

        case("3") :
            element.value = "absent";
            break;

        case("4") :
            element.value = "incertain";
            break;
    }
}

function voter(query) {

    let ligne;
    let num_match;    
    let num_vote = "";

    let div = document.getElementById("nomJoueur");
    num_match = div.getAttribute("data-match");
    ligne = div.getAttribute("data-nosql");

    let votes = document.querySelectorAll(".query"+ query);
    for(let i = 0; i<votes.length; i++) {
        let vote = votes[i];
        if(vote.checked == true) {
            num_vote += vote.getAttribute("data-no") + "_";            
        }
    }

    if(num_vote != "") {

        let url="php/updateVote.php?query=" + query + "&ligne=" + ligne + "&num_match=" + num_match +
            "&num_vote=" + num_vote;

        $ajaxUtils.sendGetRequest(url, function(request) {

            let retour = request.responseText;

            let div  = document.querySelector("#retourPresence");
            div.value = retour;
            div.style.display = "block";
            
        })

    }
    
}