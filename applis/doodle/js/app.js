document.addEventListener("DOMContentLoaded", function (event) {

    /*
    $( ".retour" ).on( "click", function( event ) {
        retour();
      });
      

        $ajaxUtils.sendGetRequest("php/queryMatchs.php", 
        function(request) {

            let reponse = request.responseText;
            
            let matchs = JSON.parse(reponse);
            TousLesMatchs = matchs;

                matchs.forEach(element => {
                    //console.log(element);
                    constructionMatch(element);
                });
    */
   let btnAjouter = document.getElementById("btnAjouter");
   btnAjouter.addEventListener("click", function(event) {
        ouvrirPageAjout();
   })

   document.getElementById("fermerPageAjout").addEventListener("click", function(event) {
       fermerPageAjout();
   })
})

function ouvrirPageAjout() {

    let div = $("#pageAjout");
    div.addClass("ouverte");
}

function fermerPageAjout() {

    let div = $("#pageAjout");
    div.removeClass("ouverte");
}