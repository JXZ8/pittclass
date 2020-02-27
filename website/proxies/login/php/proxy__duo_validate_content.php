<?php
    include_once("check_session_id.php");

    if ( !isset($_COOKIE["session_id"]) )
    {
        header("Location: proxy__login.php");
        exit();
    }

    $session_id = $_COOKIE["session_id"];

    $command = escapeshellcmd('python ../python/duo_validate_content.py '.$session_id);
    $output = shell_exec($command);
    echo $output;
?>