// --------------------------- A FAIRE -------------------

// Supprimmer this.score et remplacer dans les méthodes cette variable
//par var gauche = sessionStorage.getItem("scoreGauche");
//var droite = sessionStorage.getItem("scoreDroite");
//les méthodes sont dispatchées dans tous les fichiers
//This.score ne sert à rien et renvoie null lors du loading


//test prototype
var Score = function(cle, Cle_Nom, score_set){

    this.cle = cle;   
    this.Cle_Nom = Cle_Nom;     
    this.score_set = score_set;

    //Initialiser dans le HTML le score
    //si session de cle === null => set item à 0
    this.loading_score = function(){
        if(sessionStorage.getItem(this.cle) == null){
            sessionStorage.setItem(this.cle , 0);
            document.getElementById(this.cle).value = sessionStorage.getItem(this.cle);
        }
        else {
            document.getElementById(this.cle).value = sessionStorage.getItem(this.cle);
        }

    }   

    //Chargement du nom
    this.loading_nom = function(){

        if(sessionStorage.getItem(this.Cle_Nom) == null){
            sessionStorage.setItem(this.Cle_Nom , "equipe");
        }
        else {
            document.getElementById(this.Cle_Nom).value = sessionStorage.getItem(this.Cle_Nom);
        }
    }   
    
    this.loading_score_set = function(){
        if(sessionStorage.getItem(this.score_set) == null){
            sessionStorage.setItem(this.score_set , 0);
            document.getElementById(this.score_set).value = 0;
        }
        else {
            document.getElementById(this.score_set).value = sessionStorage.getItem(this.score_set);
        }
    }
    
    this.attribuerNom = function(){
        var nom = document.getElementById(this.Cle_Nom).value;
        sessionStorage.setItem(this.Cle_Nom, nom);
    }
    
    this.plus = function(){ 
            var score = sessionStorage.getItem(this.cle);
            score++;
            sessionStorage.setItem(this.cle, score);         
            document.getElementById(this.cle).value = sessionStorage.getItem(this.cle);
            
    }

    this.moins = function(){
        var score = sessionStorage.getItem(this.cle);
        if(score > 0){
            score --
            sessionStorage.setItem(this.cle, score);
        }        
        document.getElementById(this.cle).value = sessionStorage.getItem(this.cle);
        
    }

    this.setPlusUn = function(){
        var scoreSet = sessionStorage.getItem(this.score_set);
        scoreSet++;
        sessionStorage.setItem(this.score_set, scoreSet);
        document.getElementById(this.score_set).value = scoreSet;
    }

    this.remiseZero = function(){
        sessionStorage.setItem(this.cle, 0);
        document.getElementById(this.cle).value = sessionStorage.getItem(this.cle);
    }
   
}

var scoreGauche  = new Score("scoreGauche", "nomGauche", "setGauche");
var scoreDroite  = new Score("scoreDroite", "nomDroite", "setDroite");