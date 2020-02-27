<?php
    require_once($_SERVER['DOCUMENT_ROOT']."/internal/php/lib/Tool.php");





    //login request
    if ( isset($_POST["j_username"]) && isset($_POST["j_password"]) )
    {
        $session_id = $_COOKIE["session_id"];
        //validate username and password
        $command = escapeshellcmd('python ../python/validate_userpwd.py '.$session_id.' "'.$_POST["j_username"].'" "'.$_POST['j_password'].'"');
        $output = shell_exec($command);
        $output_json = json_decode($output, true);

        if ($output_json["status"] == "success")
            header("Location: proxy__duo_validate_frame.php");
        else
            print_r($output_json["content"]);

    }
    else{
        $session_id = Tool::generateRandomString(30,"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
        setcookie("session_id", $session_id, time() + (180*60), "/");

        $command = escapeshellcmd('python ../python/login.py '.$session_id);
        $output = shell_exec($command);
        echo $output;
    }


?>