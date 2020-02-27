<?php
    include_once("../check_session_id.php");


    if ( !isset($_GET["txid"]) || !isset($_POST["sid"]) )
    {
        header("HTTP/1.0 400 Bad Request");
        exit();
    }

    $session_id = $_COOKIE["session_id"];
    $txid = $_GET["txid"];
    $sid = $_POST["sid"];
    $command = escapeshellcmd('python ../../python/status_set_cookie.py "'.$session_id.'" "'.$sid.'" "'.$txid.'"');
    $output = shell_exec($command);
    echo $output;
?>