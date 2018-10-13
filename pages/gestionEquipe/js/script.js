
// alternative to load event

  alert(navigator.userAgent);

  if(navigator.userAgent.indexOf('Edge') != -1) { 

    alert("ok");
       
        let buttons = document.querySelectorAll(".retour");
        
        for(let i = 0; i<buttons.length; i++) {
            buttons[i].addEventListener("click", retour);
        }
       
       //document.querySelector("#retour").addEventListener("click", retour);
      
    }
  
 
  

function retour() {
    location ="../../index.php";
}