<?php
  include('html/doctype.html');
?>

  <body>

    <?php
      include('html/header.html');
    ?>

    <button id="test">TEST</button>
    <div id="valeurDeRetour"></div>
   
    <?php
      include('php/listeDesMatchs.php');  
    ?>
    
    
    <?php

    //include('html/ajout.html');

    ?>
    

    <?php
      include('html/footer.html');
    ?>

  <!-- Bundle Bootstrap --------------------------------- -->
  <script type="text/javascript" src="bundle.js"></script>
  <script type="text/javascript" src="js/test.js"></script>
       
  </body>
</html>