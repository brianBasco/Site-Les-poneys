<?php
    include('../../php/session.php');
?>

<?php
    include('php/queryDB.php');
?> 

<?php

    include('html/doctype.html');

?>

 <body>

    <?php
        include('html/header.html');
    ?>


    <?php
        include('php/vue/joueurs.php');
    ?>

    <?php
        include('php/vue/mail.php');
    ?>

    <?php
        include('html/retour.html');
    ?>


<!-- Bundle Bootstrap --------------------------------- -->
<script type="text/javascript" src="../../bundle.js"></script>
   
</body>
</html>