// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {
    
    // Unobtrusive event binding
    document.querySelector("#ajout")
      .addEventListener("click", function () {
        
        // Call server to get the name
        $ajaxUtils
          .sendGetRequest("updatedb.php", 
            function (request) {

              //bdd mise à jour, doit retourner un ob
              //var nom = request.responseText;

              document.querySelector("#reponse")
                .innerHTML = "<h2>Updated</h2>";
            });

        
      });

    document.querySelectorAll(".plus")
      .addEventListener("click", plus(this));
      
    document.querySelectorAll(".moins")
      .addEventListener("click", moins(this));

      //Afficher le contenu du match
    function plus(container) {
      console.log(container);
      var id = "#" + container;
      document.getElementById(id).style = "height:0px";
    }

    //Cacher le contenu du match
    function moins(container) {
      var id = "#" + container;
      document.getElementById(id).style = "height:intial";
    }    
  
  
  }
);

