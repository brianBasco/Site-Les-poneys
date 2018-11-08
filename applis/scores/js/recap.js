function afficherItem(cle){
    return document.getElementById(cle).innerHTML = sessionStorage.getItem(cle);
}

function get_Item(cle){
    return sessionStorage.getItem(cle);
}

function get_element(cle){
    return document.getElementById(cle);
}

function recap(){
    
    //insertion des noms
    recapNom();

    //insertion des scores du recap
    //pour chaque ligne, si le score du set n'a pas été initialisé,
    // alors on renvoie 0, sinon on inscrit le score du set enregistré dans 
    // le sessionStorage
    
    for(var i = 1; i <= 10; i++){

        if(get_Item(getKey(i)) == null)  get_element(getKey(i)).innerHTML = "0";
        else afficherItem(getKey(i));

    }
    
    total();
    
}



function total(){

    var totalGauche = 0;
    var totalDroite = 0;
    var total = 0;

    for(var i = 0; i<5; i++){
        if(isNaN(parseInt(get_element("set"+ (i+1) + "_score_gauche").innerHTML))){
            totalGauche += 0;
        }
        else {
            totalGauche += parseInt(get_element("set"+ (i+1) + "_score_gauche").innerHTML);
        }
    }

    for(var i = 0; i<5; i++){
        if(isNaN(parseInt(get_element("set"+ (i+1) + "_score_droite").innerHTML))){
            totalDroite += 0;
        }
        else {
            totalDroite += parseInt(get_element("set"+ (i+1) + "_score_droite").innerHTML);
        }
    }

    total = totalGauche + totalDroite;

    get_element("total_score_gauche").innerHTML = totalGauche;
    get_element("total_score_droite").innerHTML = totalDroite;
    get_element('total').innerHTML = "Points au TOTAL : " + total;

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

function recapNom() {

    let noms = ["nomGauche", "nomDroite"];
    let inputs = ["nom_score_gauche", "nom_score_droite"];

    for(let i = 0; i<noms.length; i++) {        
        document.getElementById(inputs[i]).innerHTML = get_Item(noms[i]);
    }
    
}