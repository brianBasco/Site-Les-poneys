//Encapsulation des constantes
function getMatch(numeroMatch) {
    const match1 = [['a','d'],['e','b'],['f','c']];
    const match2 = [['d','f'],['e','a'],['c','b']];
    const match3 = [['b','d'],['c','e'],['f','a']];
    const match4 = [['a','c'],['b','f'],['d','e']];
    const match5 = [['d','c'],['a','b'],['e','f']];

    const matchs = [match1,match2,match3,match4,match5];

    return matchs[numeroMatch];

}

//A l'appel de la page
function init() {
    if(window.sessionStorage.getItem("numMatch") == null) 
        window.sessionStorage.setItem("numMatch", 0);

    var numeroMatch = parseInt(window.sessionStorage.getItem("numMatch"));
    afficherNumeroMatch(numeroMatch);
}

//Au click de l'utilisateur
function action() {
    var num = numMatchPlus();
    //afficher sur la page
    afficherNumeroMatch(num);
    attribuerDemiTerrain(num);   
}

//ajoute +1 au n° de match et sauvegarde en sessionStorage
function numMatchPlus() {
    var numMatch = parseInt(window.sessionStorage.getItem("numMatch"));
    //Si numéro de match à 4 on repasse à 0 (5 matchs de 0 à 4)
    if(numMatch == 4)  numMatch = -1;
    numMatch++;
    window.sessionStorage.setItem("numMatch", numMatch);
    return numMatch;
}




//retourne le tableau avec l'ordre des terrains
function attribuerTerrain() {
    var res = [];
    //attribution
    var match1 = Math.floor(Math.random() *3);
        
    do{
        var match2 = Math.floor(Math.random() *3);
    }
    while(match2 == match1);    

    //attribution du terrain restant :
    var i = 0;
    while(match1 == i || match2 == i) i++;
    var match3 = i;

    res.push(match1);
    res.push(match2);
    res.push(match3);
    
    return res;
}

function afficherNumeroMatch(numero) {
    var res = numero +1;
    document.getElementById("numeroMatch").innerHTML= res ;
}


//Enlève la classe de la balise et ajoute la nouvelle classe
function changeClasse(classe1, classe2, equipe1, equipe2) {

    var places = ['a','b','c','d','e','f'];

    places.forEach(element => {
        if($("#"+equipe1).hasClass(element)) $("#"+equipe1).removeClass(element);
        if($("#"+equipe2).hasClass(element)) $("#"+equipe2).removeClass(element);
    });

    $("#"+equipe1).addClass(classe1);
    $("#"+equipe2).addClass(classe2);
}

function attribuerDemiTerrain(num) {
    var res = attribuerTerrain();

    //a ce niveau j'ai l'equipe + le terrain
    for(var i = 0; i<3; i++) {
        var equipe1 = getMatch(num)[i][0];
        var equipe2 = getMatch(num)[i][1];

        switch(res[i]) {
            case 0: changeClasse('a','d', equipe1, equipe2);
                break;
            case 1: changeClasse('b','e', equipe1, equipe2);
                break;
            case 2: changeClasse('c','f', equipe1, equipe2);
                break;
        }
    }
    
}

function retour() {
    location = "../../index.php";
}