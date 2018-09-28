<?php

    require 'ConnexionDb.php';

    $pdo = new PDO(MYSQL, USER, PSWD);
    $pdo->query("SET NAMES UTF8");

    $numMatch = (int)$_GET['match'];
    
    $req = $pdo->prepare("DELETE FROM matchs WHERE id=(?)");
    $req->execute(array($numMatch));

    $req1 = $pdo->prepare("DELETE FROM presence WHERE num_match=(?)");
    $req1->execute(array($numMatch));

    $pdo = null;

?>