// A FAIRE function reset avec le bouton reset -> remettre le texte vide
// Essayer de gérer expediteur De :


document.addEventListener("DOMContentLoaded",
  function (event) {

      document.querySelector("#tous").addEventListener("click", selectTous);
      document.querySelector("#aucun").addEventListener("click", deselectTous);
      document.querySelector("#presents").addEventListener("click", selectPresents);
      document.querySelector("#envoyerMail").addEventListener("click", envoyerMail);
      document.querySelector("#annuler").addEventListener("click", retourAccueil);
      document.querySelector("#reset").addEventListener("click", reset);
  }
);

function selectPresents () {
    let tous = document.querySelectorAll(".querySelect");
    for (let i = 0; i<tous.length; i++) {
        let present = tous[i].getAttribute("data-present");
        if(present == 1 || present == 2) tous[i].checked = true;
        else tous[i].checked = false;
    }
}

function selectTous () {
    let tous = document.querySelectorAll(".querySelect");
    for (let i = 0; i<tous.length; i++) {
        tous[i].checked = true;
    }
}

function deselectTous() {
    let aucun = document.querySelectorAll(".querySelect");
    for (let i = 0; i<aucun.length; i++) {
        aucun[i].checked = false;
    }
}

function recupAdressesMail() {
    let adresses = [];
    let tous = document.querySelectorAll(".querySelect");
    for (let i = 0; i<tous.length; i++) {
        if(tous[i].checked) {
            let adresse = tous[i].value;
            adresses.push(adresse);
        }
    }
    return adresses;
}

function recupMail() {
    return document.getElementById("email").value;
}

function recupEntete() {
    return document.getElementById("entete").value;
}

function envoyerMail() {
    let adresses = recupAdressesMail();
    let entete = recupEntete();
    let mail = recupMail();

    url = "php/envoiMail.php?destinataires=" + adresses +"&entete=" + entete +"&contenu=" + mail;
    
    $ajaxUtils.sendGetRequest(url, function(request) {

        let reponse = request.responseText;

        let retour = document.getElementById("retourEnvoi");
        //Remise à zero si un mail a déjà été envoyé
        retour.value = "";
        setTimeout(function() {
            retour.value = reponse;
            retour.style.display = "initial";
        }, 200);
        
    })
    
}

function retourAccueil(){

    location = "../../poneys.php";
}

function reset() {

    let mail = document.getElementById("email");
    mail.value = "";
}