
function initSet(){
    if(sessionStorage.getItem('set') == null) sessionStorage.setItem('set', 1);
}


function rechargerService(){
    if( (sessionStorage.getItem('serviceGauche') == null) || (sessionStorage.getItem('serviceDroite') == null) ){
        sessionStorage.setItem('serviceGauche', 0);
        sessionStorage.setItem('serviceDroite', 0);
    }
    else {
        if(sessionStorage.getItem('serviceGauche') == 1) attrService("scoreGauche");
        else if(sessionStorage.getItem('serviceDroite') == 1) attrService("scoreDroite");
    }
    
}


function initTpsMort(){
    if(sessionStorage.getItem('tpsMortGauche') == null) {
        sessionStorage.setItem('tpsMortGauche', 2);
        sessionStorage.setItem('tpsMortDroite', 2);
    }
    
}

function initChangementSet5(){
    if(sessionStorage.getItem('changementSet5') == null) 
    {
        sessionStorage.setItem('changementSet5', 0);
    }
}

function loadingTpsMort(){
    var tpsmortGauche = sessionStorage.getItem('tpsMortGauche');
    var tpsmortDroite = sessionStorage.getItem('tpsMortDroite');
    for(var i = 0; i<tpsmortGauche; i++){
        var id = "tps" + (i+1);
        document.getElementById(id).style.opacity = 1;
    }
    for(var i = 0; i<tpsmortDroite; i++){
        var id = "tps" + (i+3);
        document.getElementById(id).style.opacity = 1;
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

//fonction permettant d'initaliser la variable inverse à false
function inverser(){
    //si elle n'est pas initialisée on l'initialise à false
    if(sessionStorage.getItem("inverse") == null){
        sessionStorage.setItem('inverse', 0);
    }
   
    //sinon, il faut modifier les positions des div
    else if(sessionStorage.getItem('inverse') % 2 == 1) {
        change();
    }
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

function disableBtnNveauSet(){
    $("#nveauSet").attr('disabled', true);
}

function enableBtnNveauSet(){
    $("#nveauSet").attr('disabled', false);
}

function nouveauSet(){

    //check si on est à la fin du match    
    if((set_en_cours() >= 5) ){
        //on affiche la div FinMatch
        finMatch();
    }
    else {

    fermerDiv('finSet');

    disableBtnNveauSet();

    //Insertion du score du set suivant le vainqueur
    inscrire_score_set();

    //sessionStorage du set en cours
    incrementer_set();

    //insertion du set dans le HTML
    setNumeroRound();
    
    //store la nouvelle position des div
    var inverse = sessionStorage.getItem('inverse');
    inverse++;
    sessionStorage.setItem('inverse', inverse);

    //Remet les scores à 0
    scoreGauche.remiseZero();
    scoreDroite.remiseZero();

    //Remet les temps morts techniques à 0
    setTpsMortTech();
    
    // Remet le service à 0
    setService();
    
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

    //affiche les temps morts techniques
    var tpsMorttech1 = sessionStorage.getItem('tpsMortTech1');
    var tpsMorttech2 = sessionStorage.getItem('tpsMortTech2');

    var changementSet5 = sessionStorage.getItem('changementSet5');

    var gauche = parseInt(sessionStorage.getItem("scoreGauche"));
    var droite = parseInt(sessionStorage.getItem("scoreDroite"));


    if(set_en_cours() < 5){
        if( (gauche == 8 || droite == 8) && (tpsMorttech1 == 0) )
            {
                ouvrirDiv('accepterTpsMort');
                sessionStorage.setItem('tpsMortTech1', 1);
            }
        if((gauche == 16 || droite == 16) && (tpsMorttech2 == 0) )
            {
                ouvrirDiv('accepterTpsMort');
                sessionStorage.setItem('tpsMortTech2', 1);
            }

        //calcul des scores pour la fin de match:
        if((gauche >= 25 || droite >= 25) && (((gauche - droite) >= 2) || ((droite - gauche) >= 2)))
        {
            enableBtnNveauSet();

        }
    }
        
    else if(set_en_cours() == 5){
        //changementSet5 contient si le changement a été fait,
        //0 pour non , 1 pour oui
        if( ((gauche == 8) || (droite == 8)) && changementSet5 == 0) 
        {
            ouvrirDiv("chgtPosition");
        }
        if((gauche >=15 || droite >= 15) && (((gauche - droite) >= 2) || ((droite - gauche) >= 2)))
        {
            finMatch();
        }
    }
}

function inverserPositionSet5(){

    fermerDiv("chgtPosition");

    sessionStorage.setItem('changementSet5', 1);
    //store la nouvelle position des div
    //Invsersion des positions
    var inverse = sessionStorage.getItem('inverse');
    inverse++;
    sessionStorage.setItem('inverse', inverse);
    change();
}

function finSet(){
        insertionInfos();
        ouvrirDiv('finSet');
}

function finMatch(){
    insertionInfos();
    ouvrirDiv('finMatch');    
}

//Fait disparaitre les temps morts quand ils sont cliqués
function enlever(numero){
    var id = "tps" + numero;
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
    
    document.getElementById(id).style.opacity = 0;
    afficherTempsMort('normal');
}

   
//affiche TEMPS MORT TECHNIQUE
function afficherTempsMort(tpsMort) {

    insertionInfos();
    var tps = $("#tempsMortTechnique");

    //Si c'est un temps mort technique
    if (tpsMort == "technique") {

        fermerDiv('accepterTpsMort');        
        tps.css("display", "block");

        setTimeout(function () {
            tps.css("opacity", 1);
        }, 200)

        chrono(60);
    }
    else if (tpsMort == "normal"){

        tps.css("display", "block");

        setTimeout(function () {
            tps.css("opacity", 1);
        }, 200)

        chrono(30);
    }
}

function passerTempsMortTechnique(){
    var tps = $("#tempsMortTechnique");
    var image = $("#image");

    tps.css("opacity", 0);
    tps.css("display", "none");
    image.attr("src", "");
    
}

//Tout remettre à zéro et supprimer les sessions storage
function nouveauMatch(){

    fermerDiv('finMatch');

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

    var set = 'set';

    if(sessionStorage.getItem(set) == 1) {
        return 1;
    }

    else if(sessionStorage.getItem(set) == 2) {
        return 2;
    }
        
    else if(sessionStorage.getItem(set) == 3) {
        return 3;
    }

    else if(sessionStorage.getItem(set) == 4) {
        return 4;
    }

    else if(sessionStorage.getItem(set) == 5) {
        return 5;
    }
}

function incrementer_set(){
    var set = set_en_cours();
    set++;

    sessionStorage.setItem('set', set);
}

function setService(){
    // Enlever la classe hasService

    $('#serviceGauche').removeClass('hasService');
    $('#serviceDroite').removeClass('hasService');
    sessionStorage.setItem("serviceGauche", 0);
    sessionStorage.setItem("serviceDroite", 0);
   
}

function attrService(balise) {
    if(balise == "scoreGauche") {
        setService();
        $('#serviceGauche').addClass('hasService');
        sessionStorage.setItem("serviceGauche", 1);
        sessionStorage.setItem("serviceDroite", 0);
    }
    else if(balise == "scoreDroite") {
        setService();
        $('#serviceDroite').addClass('hasService');
        sessionStorage.setItem("serviceGauche", 0);
        sessionStorage.setItem("serviceDroite", 1);
    }
}


function afficherNewSet(){
    var height = $(document).height();
    var equipe1 = document.getElementById('equipe1');
    var equipe2 = document.getElementById('equipe2');
    var x = document.getElementById("myAudio");

    x.play();

    afficherRound();

    if(b("nomGauche") != "equipe" && b("nomGauche") != "") equipe1.innerHTML = sessionStorage.getItem('nomGauche');
    else equipe1.innerHTML = "equipe 1";

    if(b("nomDroite") != "equipe" && b("nomDroite") != "") equipe2.innerHTML = sessionStorage.getItem('nomDroite');
    else equipe2.innerHTML = "equipe 2";

    $('.newSet').css('height', height);
    $('.newSet').css('display', 'block');

    setTimeout(function(){
        $('.newSet').css('display', 'none');
    }, 5000) //Afficher le nouveau set pendant 5 secondes
}

function afficherRound(){
    var balise = document.getElementById('numeroRound');
    if(set_en_cours() == 2) balise.innerHTML = 2;
    else if(set_en_cours() == 3) balise.innerHTML = 3;
    else if(set_en_cours() == 4) balise.innerHTML = 4;
    else if(set_en_cours() == 5) balise.innerHTML = 5;
}

function a(cle){
    return document.getElementById(cle).innerHTML = sessionStorage.getItem(cle);
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
    var display = $("#tempsMortTechnique").css("display");

    setInterval(function(){
        
        if((time >= 0) && (display == "block")){
            chrono.html(time);
            time--;
            display = $("#tempsMortTechnique").css("display");            
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

function setNumeroRound() {
    $("#numeroRound").html(sessionStorage.getItem("set"));
}






 
