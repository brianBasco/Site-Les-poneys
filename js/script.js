// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {

    // Unobtrusive event binding
    document.querySelector("#test")
      .addEventListener("click", function () {
        
        // Call server to get the name
        $ajaxUtils
          .sendGetRequest("php/updatedb.php", 
            function (request) {

              
            //  var nom = request.responseText;

              document.querySelector("#valeurDeRetour")
                .innerHTML = "<h2>Updated</h2>"; 
            });

        
      });
      
  }
);

