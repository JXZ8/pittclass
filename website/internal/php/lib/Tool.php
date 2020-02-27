<?php


class Tool
{
    /**
     * ret a random string
     *
     * @param int       $length   length of the random string that you want to generate
     * @param string      $characters   Characters that might appear in the string
     *
     * @return string   random string
     */
    public static function generateRandomString($length, $characters="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

}