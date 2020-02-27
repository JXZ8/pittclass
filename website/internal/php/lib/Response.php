<?php


class Response
{
    /**
     * Response Info Class.
     *
     * Response type: json
     *
     * There are two things that will be returned:
     * 1. status: ok/failed           Status of the required operation
     * 2. data: data                  Data of the required operation. If status = failed, data will be the reason
     *
     * @author: Jingxuan Zhang <jiz176@pitt.edu>
     */

    /**
     * Occurs when login_session has expired.
     */
    public static function sessionExpired(){
        echo '{"status":"failed", "data":{"reason":"Login session has expired"}}';
    }
}