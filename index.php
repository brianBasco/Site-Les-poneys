<?php
  include('html/doctype.html');
?>

  <body>

    <?php
      include('html/header.html');
    ?>
    
   
    <?php
      include('php/listeDesMatchs.php');  
    ?>

    <?php

      include('php/view/joueur.php');

    ?>    
    

    <?php
      include('html/footer.html');
    ?>

  <!-- Bundle Bootstrap --------------------------------- -->
  <script type="text/javascript" src="bundle.js"></script>
       
  </body>
</html>