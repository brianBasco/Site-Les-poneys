
document.addEventListener("DOMContentLoaded", function (event) {
    $( ".retour" ).on( "click", function( event ) {
        retour();
      });
})        

function retour() {
    location ="../../index.php";
}