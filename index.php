<?php
  include('html/doctype.html');
?>

  <body>

    <?php
      include('html/header.html');
    ?>

    <button onclick="test1()">TEST</button>
   
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