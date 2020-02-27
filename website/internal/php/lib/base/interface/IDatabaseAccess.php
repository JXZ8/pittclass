<?php
    interface IDatabaseAccess
    {
        /*
         * Interface for database handler
         *
         * @author: Jingxuan Zhang <jiz176@pitt.edu>
         */



        /**
         * Create a mysqli instance and connect to the database.
         *
         * @param string $serveraddr    The server address
         * @param string $username      The user name
         * @param string $password      The password
         *
         * @return bool         Result.
         */
        public function connect($serveraddr, $username, $password);


        /**
         * Create a mysqli instance and connect to the database.
         *
         * @param string $dbName    The database name
         *
         * @return bool         Result.
         */
        public function selectDB($dbName);


        /**
         * Close the connection.
         *
         * @return bool         Result.
         */
        public function close();



        /**
         * Execute sql statement.
         *
         * @param string    $sqlStatement                   Sql statement. Stmt form.
         * @params string   $criterion1, $criterion2, etc   Depends on how many "?" there are in $sqlStatement
         *
         *
         * @return mysqli_result
         */
        public function execute($sqlStatement);


        /**
         * Parse mysqli_result to array.
         *
         * @param mysqli_result  $result   mysqli_result
         *
         * @return array     Result. The same as python. [{field1:val1, field2: val1}, {field1: val2, field2: val2}, {field1: val3, field2: val3}]
         */
        public function parseExecuteResult($result);

    }
?>