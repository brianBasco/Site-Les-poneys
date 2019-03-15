document.addEventListener("DOMContentLoaded", function(event) {

    
    document.querySelector("#nveauMatch").addEventListener("click", function() {
        ouvrirDemandeNveauMatch();
    })    

    document.querySelector("#nveauSet").addEventListener("click", function() {
        ouvrirDemandeNveauSet();
    })   
    
    document.querySelector("#btn_inverser").addEventListener("click", function() {
        change();
    })

    document.querySelector("#nomGauche").addEventListener("blur" , function() {
        scoreGauche.attribuerNom();
        recapNom();
    })
    
    document.querySelector("#nomDroite").addEventListener("blur" , function() {
        scoreDroite.attribuerNom();
        recapNom();
    })
    
    let menuFlottant = document.getElementById("menuFlottant");
    let boutonsMenuFlottant = menuFlottant.getElementsByTagName("button");
    for(let i = 0; i<boutonsMenuFlottant.length; i++) {
        boutonsMenuFlottant[i].addEventListener("click", fermerMenuFlottant);
    }


    let tps_morts = document.querySelectorAll(".tps-mort");
    for(let i = 0; i<tps_morts.length; i++) {
        tps_morts[i].addEventListener("click", function(){
            //enlever(this);
            demandeTpsMort(this);
        })
    }
})

function initSet(){
    if(sessionStorage.getItem('set') == null) sessionStorage.setItem('set', 1);
}


function initTpsMort(){
    if(sessionStorage.getItem('tpsMortGauche') == null) {
        sessionStorage.setItem('tpsMortGauche', 2);
        sessionStorage.setItem('tpsMortDroite', 2);
    }
    
}


function loadingTpsMort(){
    var tpsmortGauche = sessionStorage.getItem('tpsMortGauche');
    var tpsmortDroite = sessionStorage.getItem('tpsMortDroite');
    for(var i = 0; i<tpsmortGauche; i++){
        var id = "tps" + (i+1);
        document.getElementById(id).style.visibility = "visible";
    }
    for(var i = 0; i<tpsmortDroite; i++){
        var id = "tps" + (i+3);
        document.getElementById(id).style.visibility = "visible";
    }

}

function setTpsMort(){
    sessionStorage.setItem('tpsMortGauche', 2);
    sessionStorage.setItem('tpsMortDroite', 2);
}



function initTpsMortTech(){
    if(sessionStorage.getItem('tpsMortTech1') == null ){
        sessionStorage.setItem('tpsMortTech1', 0);
        sessionStorage.setItem('tpsMortTech2', 0);
    }   
}

//Remet les temps mort techniques à 0 dans le sessionStorage
function setTpsMortTech(){
    sessionStorage.setItem('tpsMortTech1', 0);
    sessionStorage.setItem('tpsMortTech2', 0);
}


//menu flottant
function ouvrirMenuFlottant() {  
    document.getElementById("menuFlottant").classList.remove("ferme");
}

function fermerMenuFlottant() {
    document.getElementById("menuFlottant").classList.add("ferme");
}

//Pop up nouveau set
function ouvrirDemandeNveauSet() {  
    document.getElementById("demandeNveauSet").classList.remove("ferme");
}

function fermerDemandeNveauSet() {
    document.getElementById("demandeNveauSet").classList.add("ferme");
}

function accepterNveauSet() {
    fermerDemandeNveauSet();
    nouveauSet();
}


//Pop up nouveau Match
function ouvrirDemandeNveauMatch() {  
    document.getElementById("demandeNveauMatch").classList.remove("ferme");
}

function fermerDemandeNveauMatch() {
    document.getElementById("demandeNveauMatch").classList.add("ferme");
}

function accepterNveauMatch() {
    nouveauMatch();
}

//récupère l'ID d'une balise et l'affiche
function ouvrirDiv(div) {

    var myDiv = $("#" + div);    
    var hauteur = $( document ).height();
    myDiv.css("height", hauteur);
    myDiv.css("display", 'block');
}     

//récupère l'ID d'une balise et enlève son affichage
function fermerDiv(div) {
    
    var myDiv = $("#" + div);
    myDiv.css("display", "none");
}

function nouveauSet(){

    //check si on est à la fin du match    
    if((set_en_cours() >= 5) ){
        //on affiche la div FinMatch
        finMatch();
    }
    else {

    fermerDiv('finSet');

    //disableBtnNveauSet();

    //Insertion du score du set suivant le vainqueur
    inscrire_score_set();

    //sessionStorage du set en cours
    incrementer_set();

    //insertion du set dans le HTML
    afficherRound();
    
    //Remet les scores à 0
    scoreGauche.remiseZero();
    scoreDroite.remiseZero();

    //Remet les temps morts techniques à 0
    setTpsMortTech();
    
    //echange les div de place
    change();
            
    //Remet les temps mort à 2 par équipe et les fait réapparaitre 
    setTpsMort();
    loadingTpsMort();
    }
}   

//Echange les div de place
function change(){

        $(".equipe-gauche").toggleClass("droite");
        $(".equipe-droite").toggleClass("droite");
        
        $(".row_btn-score").toggleClass("droite");

        $(".equipe").toggleClass("droite");

        $("#setDroite").toggleClass("droite");
        $("#setGauche").toggleClass("droite");   
        
        $(".setGauche").toggleClass("droite");
        $(".setDroite").toggleClass("droite");    
 }


//Incrémente le score du set et modifie la vue
function inscrire_score_set(){

    var gauche = parseInt(sessionStorage.getItem("scoreGauche"));
    var droite = parseInt(sessionStorage.getItem("scoreDroite"));

    if(gauche > droite) 
    {
        scoreGauche.setPlusUn();
    }
    else 
    {
        scoreDroite.setPlusUn();
    }
}

//affiche les temps morts techniques quand un score arrive à 8 ou 16
//enregistrer les scores dans le recap

function clickScore(actionAfaire) {

    //ActionAfaire est une methode de la classe Scores
    //Il s'agit d'incrémenter ou décrémenter le score de scoreGauche ou scoreDroite
    actionAfaire;

    //enregistre les scores dans le recap
    enregistrer_score();

    //affichage dans recap
    recap();

    //affiche les temps morts techniques
    var tpsMorttech1 = sessionStorage.getItem('tpsMortTech1');
    var tpsMorttech2 = sessionStorage.getItem('tpsMortTech2');

    var gauche = parseInt(sessionStorage.getItem("scoreGauche"));
    var droite = parseInt(sessionStorage.getItem("scoreDroite"));


    
    if(set_en_cours() < 5){
        /*
        if( (gauche == 8 || droite == 8) && (tpsMorttech1 == 0) )
            {
                if(window.confirm("prendre tps mort")) afficherTempsMort("technique");
                sessionStorage.setItem('tpsMortTech1', 1);
            }
        if((gauche == 16 || droite == 16) && (tpsMorttech2 == 0) )
            {
                if(window.confirm("prendre tps mort")) afficherTempsMort("technique");
                sessionStorage.setItem('tpsMortTech2', 1);
            }
        */
        //calcul des scores pour la fin de match:
        if((gauche >= 25 || droite >= 25) && (((gauche - droite) >= 2) || ((droite - gauche) >= 2)))
        {
            //enableBtnNveauSet();
            //proposer le set suivant
            ouvrirDemandeNveauSet();


        }
    }
       
    //Balise de fin de match retirée, le score peut continuer indéfiniment
    /*
    else if(set_en_cours() == 5){
       
        if((gauche >=15 || droite >= 15) && (((gauche - droite) >= 2) || ((droite - gauche) >= 2)))
        {
            finMatch();
        }
    }
    */
}


function finSet(){
        insertionInfos();
        ouvrirDiv('finSet');
}

function finMatch(){    
    /*
        //smooth scrolling avec JQUERY, du site www.design-fluide.com, à personnaliser
		$(document).ready(function() {
		$('.js-scrollTo').on('click', function() { // Au clic sur un élément
			var page = $(this).attr('href'); // Page cible
			var speed = 750; // Durée de l'animation (en ms)
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
			return false;
		});
	});
    */

    // Scroll to a certain element
    document.getElementById("recap").scrollIntoView({ 
    behavior: 'smooth' 
  });
    

}


//Fait disparaitre un temps mort quand on clique dessus
function enlever(element){    
   
    fermerDemandeTpsMort();
    afficherTempsMort('normal');

    //element comprend le bouton dernièrement cliqué
    //dans lequel j'ai placé un autre bouton(tpsMort) dans mesParametres.
    //ce bouton tpsMort est accessible grâce à element.target.mesParametres
    let balise =  element.target.mesParametres;
    
    let numero = balise.getAttribute("data-tps_mort");

    if(numero == 1 || numero == 2){
        var tpsMort = sessionStorage.getItem('tpsMortGauche');
        tpsMort --;
        sessionStorage.setItem('tpsMortGauche', tpsMort);
    }
    else {
        var tpsMort = sessionStorage.getItem('tpsMortDroite');
        tpsMort --;
        sessionStorage.setItem('tpsMortDroite', tpsMort);
    }
    
    balise.style.visibility = "hidden";
    
}

function demandeTpsMort(element){    
    ouvrirDemandeTpsMort();
    let button = document.getElementById("accepterTpsMort");
    button.mesParametres = element;

    //element correspond au tpsMort qui a été cliqué
    //on passe cet element en paramètre du bouton d'acceptation du Tps mort
    //l event listener prend l'objet enlever, dans lequel il y a les paramètres
    //du button donc du tpsMort qui a été cliqué plus haut
    //Pas besoin d'enlever l'event listener car à chaque fois mesParametres sont remplacés
    //par la nouvelle cible et en l'absence de cible li n'y a aucun changement
    button.addEventListener('click', enlever);
}


// POP UP div demandeTpsMort
function fermerDemandeTpsMort() {  
    document.getElementById("demandeTpsMort").classList.add("ferme");
}
  
function ouvrirDemandeTpsMort(element) {    
    document.getElementById("demandeTpsMort").classList.remove("ferme");
    return element;
}



//affiche TEMPS MORT : TECHNIQUE ou EQUIPE
function accepterTpsMortEquipe() {
    fermerDemandeTpsMort();
    afficherTempsMort("normal");   
}
   

function afficherTempsMort(tpsMort) {

    //insertionInfos();
    var tps = $("#tempsMortTechnique");
    tps.removeClass("initial");
    let marge = $(".body-scores").css("margin-left");

    tps.css("left", marge);
    
    
    //Si c'est un temps mort technique
    if (tpsMort == "technique")  chrono(60);
    /* 
    {
              
        tps.css("display", "block");

        setTimeout(function () {
            tps.css("opacity", 1);
        }, 200)
    }
    */
    else if (tpsMort == "normal")  chrono(30);
    /*{

        tps.css("display", "block");

        setTimeout(function () {
            tps.css("opacity", 1);
        }, 200)
    }
    */
    
}

function passerTempsMortTechnique(){
    var tps = $("#tempsMortTechnique");

    tps.addClass("initial");

    tps.css("left", "-100%");
}


//Tout remettre à zéro et supprimer les sessions storage
function nouveauMatch(){    
        sessionStorage.clear();
        location = location;
}

//Enregistrement du score dans sessionStorage
function enregistrer_score(){

    var gauche = sessionStorage.getItem("scoreGauche");
    var droite = sessionStorage.getItem("scoreDroite");

    for(var i = 1; i <= 5; i++){
        if(set_en_cours() == i){
            sessionStorage.setItem('set'+i+'_score_gauche', gauche);
            sessionStorage.setItem('set'+i+'_score_droite', droite);
        }
    }
}

function set_en_cours(){

    return sessionStorage.getItem('set');
}

function incrementer_set(){
    var set = set_en_cours();
    set++;

    sessionStorage.setItem('set', set);
}

function afficherRound(){
    var balise = document.getElementById('numeroRound');
    balise.value = set_en_cours();
}

function a(cle){
    return document.getElementById(cle).value = sessionStorage.getItem(cle);
}

function b(cle){
    return sessionStorage.getItem(cle);
}

function c(cle){
    return document.getElementById(cle);
}

//Récupère le temps de chrono du HTML, 30 secondes ou 60 secondes
function chrono(tps){
    var chrono = $("#chrono");
    var time = tps;
    //var display = $("#tempsMortTechnique").css("display");
    //la classe initial est lorsque le temps mort n'est pas affiché
    let display = $("#tempsMortTechnique").hasClass("initial");

    setInterval(function(){
        
        //if((time >= 0) && (display == "block")){
        if((time >= 0) && (!display)){
            chrono.html(time);
            time--;
            //display = $("#tempsMortTechnique").css("display");
            display = $("#tempsMortTechnique").hasClass("initial");            
        }
        else {
            
            clearInterval();            
        }            
    }, 1000);
    
    chrono.html("");
}


function insertionInfos(){

    var equipeGauche = $(".equipeGauche p");
    var equipeDroite = $(".equipeDroite p");
    var scoreGauche = $(".equipeGauche button");
    var scoreDroite = $(".equipeDroite button");

    var score1 = sessionStorage.getItem("scoreGauche");
    var score2 = sessionStorage.getItem("scoreDroite");
    var nom1 = sessionStorage.getItem("nomGauche");
    var nom2 = sessionStorage.getItem("nomDroite");

    equipeGauche.html(nom1);
    equipeDroite.html(nom2);
    scoreGauche.html(score1);
    scoreDroite.html(score2);

}

// 7 segment display

var digitSegments = [
    [1,2,3,4,5,6],
    [2,3],
    [1,2,7,5,4],
    [1,2,7,3,4],
    [6,7,2,3],
    [1,6,7,3,4],
    [1,6,5,4,3,7],
    [1,2,3], 
    [1,2,3,4,5,6,7],
    [1,2,7,3,6]
]

/*
    setNumber(_hours[0], Math.floor(hours/10), 1);
    setNumber(_hours[1], hours%10, 1);

    setNumber(_minutes[0], Math.floor(minutes/10), 1);
    setNumber(_minutes[1], minutes%10, 1);

    setNumber(_seconds[0], Math.floor(seconds/10), 1);
    setNumber(_seconds[1], seconds%10, 1);


var setNumber = function(digit, number, on) {
  var segments = digit.querySelectorAll('.segment');

  
  var current = parseInt(digit.getAttribute('data-value'));

  // only switch if number has changed or wasn't set
  if (!isNaN(current) && current != number) {
    // unset previous number
    digitSegments[current].forEach(function(digitSegment, index) {
      setTimeout(function() {
        segments[digitSegment-1].classList.remove('on');
      }, index*45)
    });
  }
  
  if (isNaN(current) || current != number) {
    // set new number after
    setTimeout(function() {
      digitSegments[number].forEach(function(digitSegment, index) {
        setTimeout(function() {
          segments[digitSegment-1].classList.add('on');
        }, index*45)
      });
    }, 250);
    digit.setAttribute('data-value', number);
  }
}

*/

function setNumber(digit, number) {        

    console.log(digit);
    var segments = digit.querySelectorAll('.segment');

    //enlever la classe "on" pour tous les segments
    digitSegments[8].forEach(function(digitSegment) {
        
        segments[digitSegment-1].classList.remove('on');
    })

    digitSegments[number].forEach(function(digitSegment) {
        
          segments[digitSegment-1].classList.add('on');

    })

}
        









 
