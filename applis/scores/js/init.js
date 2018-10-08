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

    //Conserver la position des div quand la page est reloadée
    //var inverse = sessionStorage.getItem('inverse');
    inverser();

    //initialisation du set dans le sessionStorage
    initSet();

    //Insertion du set dans le HTML
    setNumeroRound();

    //initialisation du service
    //Tant qu'on ne choisit pas le service la variable reste à false
    rechargerService();

    //initialisation du storage des temps morts
    initTpsMort();
    loadingTpsMort();

    //Initialisation des temps morts techniques dans le sessionStorage
    initTpsMortTech();

    //Initialisation à 0 du changement des positions dans le 5ème Set
    initChangementSet5()
}
