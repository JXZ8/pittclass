<?php
    if (!isset($_POST["sid"]) || !isset($_POST["device"]) || !isset($_POST["factor"]) || !isset($_POST["out_of_date"]) || !isset($_POST["days_out_of_date"]) || !isset($_POST["days_to_block"]) )
    {
        header("HTTP/1.0 400 Bad Request");
        exit();
    }

    $passcode = "";
    if (isset($_POST["passcode"])) //if users choose passcode verification
    {
        $passcode = $_POST["passcode"];
    }

    $sid = $_POST["sid"];
    $device = $_POST["device"];
    $factor = $_POST["factor"];
    $command = escapeshellcmd('python ../../python/prompt.py "'.$sid.'" "'.$device.'" "'.$factor.'" "'.$passcode.'"');
    $output = shell_exec($command);
    echo $output;
?>