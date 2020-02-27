<?php
    if (!isset($_POST["sid"]) || !isset($_POST["txid"]) )
    {
        header("HTTP/1.0 400 Bad Request");
        exit();
    }


    $sid = $_POST["sid"];
    $txid = $_POST["txid"];
    $command = escapeshellcmd('python ../../python/status.py "'.$sid.'" "'.$txid);
    $output = shell_exec($command);
    echo $output;
?>