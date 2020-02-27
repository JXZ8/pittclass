<?php
    include_once("check_session_id.php");

    $session_id = $_COOKIE["session_id"];

    $command = escapeshellcmd('python ../python/duo_validate_frame.py '.$session_id);
    $output = shell_exec($command);
    echo $output;
?>