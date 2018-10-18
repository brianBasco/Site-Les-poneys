// A FAIRE function reset avec le bouton reset -> remettre le texte vide
// Essayer de gérer expediteur De :


document.addEventListener("DOMContentLoaded",
  function (event) {

      document.querySelector("#tous").addEventListener("click", selectTous);
      document.querySelector("#presents").addEventListener("click", selectPresents);
      document.querySelector("#envoyerMail").addEventListener("click", envoyerMail);
  }
);

function selectPresents () {
    document.querySelectorAll(".querySelect").forEach(el => {
        let present = el.getAttribute("data-present");
        if(present == 1 || present == 2) el.checked;
        else el.checked = false;
    })
}

function selectTous () {
    document.querySelectorAll(".querySelect").forEach(el => {
        el.checked = true;
    })
}

function recupAdressesMail() {
    let adresses = [];
    document.querySelectorAll(".querySelect").forEach(el => {
        if(el.checked) {
            let adresse = el.value;
            adresses.push(adresse);
        }
    })
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
    let destinataires = "";

    url = "php/envoiMail.php?destinataires=" + adresses +"&entete=" + entete +"&mail=" + mail;
    console.log(url);

    location = url;
}