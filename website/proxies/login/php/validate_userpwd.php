<?php
    /**
     * Execute validate_userpwd.py to check if the password is correct
     *
     * If correct, redirect to duo_validate_frome.php
     * else redirect back to login.php but with error info
     *
     */

include_once("check_session_id.php");

if ( !isset($_COOKIE["session_id"]) || !isset($_POST["j_username"]) || !isset($_POST["j_password"]))
    {
        header("Location: proxy__login.php");
        exit();
    }

    $session_id = $_COOKIE["session_id"];
    $username = $_POST["j_username"];
    $password = $_POST["j_password"];

    $command = escapeshellcmd('python ../python/validate_userpwd.py '.$session_id." ".$username." ".$password);
    $output = shell_exec($command);

    $output_json = json_decode($output);



?>