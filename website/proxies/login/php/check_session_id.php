<?php
    if ( !isset($_COOKIE["session_id"]) )
    {
        header("Location: proxy__login.php");
        exit();
    }


?>