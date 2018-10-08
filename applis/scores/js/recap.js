function a(cle){
    return document.getElementById(cle).innerHTML = sessionStorage.getItem(cle);
}

function b(cle){
    return sessionStorage.getItem(cle);
}

function c(cle){
    return document.getElementById(cle);
}

function recap(){
    var hauteur = $( document ).height();
    $(".recap").css("height", hauteur);
    $(".recap").css("display", "block");
    setTimeout(function(){        
        $(".recap").css("opacity", "1");
    }, 50);

    //insertion des noms
    //lors de l'initialisation les noms d'equipe sont "equipe"
    //si l'utilisateur ne rentre pas de nom le nom d'equipe devient une chaine
    //de caractères vides, donc il faut checker ces 2 conditions
    if(b("nomGauche") != "equipe" && b("nomGauche") != "") c("nom_score_gauche").innerHTML = b("nomGauche");
    else c("nom_score_gauche").innerHTML = "equipe 1";

    if(b("nomDroite") != "equipe" && b("nomDroite") != "") c("nom_score_droite").innerHTML = b("nomDroite");
    else c("nom_score_droite").innerHTML = "equipe 2";

    //insertion des scores du recap
    //pour chaque ligne, si le score du set n'a pas été initialisé,
    // alors on renvoie 0, sinon on inscrit le score du set enregistré dans 
    // le sessionStorage
    
    for(var i = 1; i <= 10; i++){

        if(b(getKey(i)) == null)  c(getKey(i)).innerHTML = "0";
        else a(getKey(i));

    }
    
    total();
    
}

function close_recap(){

    $(".recap").css("display", "none");
    $(".recap").css("opacity", "0");
}

function total(){

    var totalGauche = 0;
    var totalDroite = 0;
    var total = 0;

    for(var i = 0; i<5; i++){
        if(isNaN(parseInt(c("set"+ (i+1) + "_score_gauche").innerHTML))){
            totalGauche += 0;
        }
        else {
            totalGauche += parseInt(c("set"+ (i+1) + "_score_gauche").innerHTML);
        }
    }

    for(var i = 0; i<5; i++){
        if(isNaN(parseInt(c("set"+ (i+1) + "_score_droite").innerHTML))){
            totalDroite += 0;
        }
        else {
            totalDroite += parseInt(c("set"+ (i+1) + "_score_droite").innerHTML);
        }
    }

    total = totalGauche + totalDroite;

    c("total_score_gauche").innerHTML = totalGauche;
    c("total_score_droite").innerHTML = totalDroite;
    c('total').innerHTML = "Points au TOTAL : " + total;

}



function getKey(numero){

    if(numero == 1) return "set1_score_gauche";
    if(numero == 2) return "set1_score_droite";
    if(numero == 3) return "set2_score_gauche";
    if(numero == 4) return "set2_score_droite";
    if(numero == 5) return "set3_score_gauche";
    if(numero == 6) return "set3_score_droite";
    if(numero == 7) return "set4_score_gauche";
    if(numero == 8) return "set4_score_droite";
    if(numero == 9) return "set5_score_gauche";
    if(numero == 10) return "set5_score_droite";

}