<?php

    date_default_timezone_set('America/New_York');

    class DatetimeManager
    {
        /*
         * Date & time manager
         *
         * @author: Jingxuan Zhang <jiz176@pitt.edu>
         */


        /*
         * Get current date
         *
         * @param       $separator   The separator between year-month-date
         *
         * @return      string      Current date like "2019?11?27" ? need to specified
         */
        public static function getCurrentDate($separator="")
        {
            $format = "Y".$separator."m".$separator."d";
            return date($format);
        }

        /*
        * Get current time
        *
        * @param       $separator   The separator between hours-minutes-seconds
        * @param       $showSecond   The separator between hours-minutes-seconds
        *
        * @return      string      Current time like "2019?11?27" ? need to specified
        */
        public static function getCurrentTime($separator="", $showSecond=true)
        {
            if ($showSecond)
                $format = "H".$separator."i".$separator."s";
            else
                $format = "H".$separator."i";
            return date($format);
        }

        /**
         * Get millisecond time stamp
         *
         * @return false|string
         */
        public static function getMillisecond(){
            list($msec, $sec) = explode(' ', microtime());
            return (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
        }

        /**
         * Get microsecond time stamp
         *
         * @return false|string
         */
        public static function getMicrosecond() {
            list($t1, $t2) = explode(' ', microtime());
            return (float)sprintf('%.0f', (floatval($t1) + floatval($t2)) * 1000000);
        }


    }
?>