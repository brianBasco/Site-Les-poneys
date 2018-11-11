<?php
        include('php/session.php');
?>

<?php

    include('html/doctype.html');

?>

 <body>

    <?php
        include('html/scoreBoard.html');
    ?>

    <?php
        include('html/header.html');
    ?>


    <?php
        include('php/vue/joueurs.php');
    ?>

    <?php
        include('html/matchs.html');
    ?>

    

<!-- Bundle Bootstrap --------------------------------- -->
<script type="text/javascript" src="../../bundle.js"></script>
<script type="text/javascript" src="../../jquery.js"></script>
<script type="text/javascript" src="../../js/ajax_utils.js"></script>
<script type="text/javascript" src="js/script.js"></script>
   
</body>
</html>