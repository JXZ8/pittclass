<?php
    require_once($_SERVER['DOCUMENT_ROOT'].'/internal/php/lib/Response.php');
    /**
     * Two operations:
     * 1. add: add course to user's shopping cart
     * 2. delete: delete course from user's shopping cart
     */

    if (!isset($_COOKIE["login_session"]))
    {
        Response::sessionExpired();
        exit();
    }

    if (!i)


?>