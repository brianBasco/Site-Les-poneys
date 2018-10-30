<?php
      include('php/session.php');
?>


<?php
  include('html/doctype.html');
?>

  <body>
     
    <?php
      include('html/header.html');
    ?>

    
    <?php

      include('html/infos.html');
    ?>

    <?php
      include('php/listeDesMatchs.php');  
    ?>


    <?php      
      include('html/gestionJoueur.html');
    ?>

    <?php
      include('html/footer.html');
    ?>


  <!-- Bundle Bootstrap --------------------------------- -->
  <script type="text/javascript" src="bundle.js"></script>
  <script type="text/javascript" src="jquery.js"></script>
  <script type="text/javascript" src="js/frontend.js"></script>
       
  </body>
</html>