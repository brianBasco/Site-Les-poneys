init();



function init(){

    //loading du score
    scoreGauche.loading_score();
    scoreDroite.loading_score();

    //loading du set
    scoreGauche.loading_score_set();
    scoreDroite.loading_score_set();

    //Chargement du nom
    scoreGauche.loading_nom();
    scoreDroite.loading_nom();
   
    //initialisation du set dans le sessionStorage
    initSet();

    //Insertion du set dans le HTML
    afficherRound();
    
    //initialisation du storage des temps morts
    initTpsMort();
    loadingTpsMort();

    //Initialisation des temps morts techniques dans le sessionStorage
    initTpsMortTech();

    recap();
}
