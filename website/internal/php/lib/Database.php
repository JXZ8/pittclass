<?php
    require_once(__DIR__."/base/interface/IStmtable.php");
    require_once(__DIR__."/base/interface/IDatabaseAccess.php");
    require_once(__DIR__."/base/class/FunctionParameter.php");
    require_once(__DIR__."/Logger.php");

	class Database Implements IStmtable, IDatabaseAccess
	{
        /**
         * Database class to operate database.
         *
         * @author: Jingxuan Zhang <jiz176@pitt.edu>
         */

        /*
         * Mysqli connection class reference
         *
         * @var mysqli
         */
        private $conn;

        /*
         * Logger reference
         *
         * @var Logger
         */
        private $l;


        /**
         * Database constructor.
         *
         * @param string $db_name       The database to use
         * @param string $serveraddr    The server address
         * @param string $username      The user name
         * @param string $password      The password
         */
		public function __construct($dbName, $serveraddr = "192.168.1.144", $username = "root", $password = "xuan32546")
		{
		    $this->l = new Logger("../log");

			if (!$this->connect($serveraddr, $username, $password))
			    die("Connect to database error");

            if (!$this->selectDB($dbName))
                die("Select db error");
		}


        /**
         * Destructor.
         */
        public function __destruct()
        {
            $this->close();
        }


        /**
         * Execute sql statement.
         *
         * @param string    $sqlStatement                   Sql statement. Stmt form.
         * @params string   $criterion1, $criterion2, etc   Depends on how many "?" there are in $sqlStatement
         *
         *
         * @return mysqli_result     Result.
         */
		public function execute($sqlStatement)
        {
            $paramArr = func_get_args();
            array_shift($paramArr);

            $bindParam = '';

            for($i = 0, $len = sizeof($paramArr); $i < $len; $i++)
            {
                if (is_int($paramArr[$i]))
                    $bindParam .= "i";
                else if (is_double($paramArr[$i]))
                    $bindParam .= "d";
                else
                    $bindParam .= "s";
            }



            $stmt = $this->conn->prepare($sqlStatement);

            if ($stmt === false)
            {
                $this->l->error("Mysqli prepare failed in function Database::execute().", new FunctionParameter("\$sqlStatement", $sqlStatement));
                return false;
            }



            $bindParamResult = $stmt->bind_param($bindParam, ...$paramArr);
            if (!$bindParamResult)
            {
                $this->l->error("Mysqli bind param failed in function Database::execute(). ", new FunctionParameter("\$sqlStatement;bindParam;paramArr: ", $sqlStatement, $bindParam, $paramArr));
                return false;
            }
            $stmt->execute();

            $result = $stmt->get_result();


            //Notice: even if the sql statement is executed successfully, if it is non query statement, the result of get_result() will still be false (I don't know why they do that)
            //But if it comes here, and the $result is False, it means the execution succeed but non query statement! So just return success.
            if ($result === False)
                return True;

            return $result;
        }

        /**
         * Create a mysqli instance and connect to the database.
         *
         * @param string $serveraddr The server address
         * @param string $username The user name
         * @param string $password The password
         *
         * @return bool         Result.
         */
        public function connect($serveraddr, $username, $password)
        {
            $this->conn = new mysqli($serveraddr, $username, $password);

            if ($this->conn->connect_error) {
                $this->l->error("Database Connect Error: " . $this->conn->connect_error.". Server Addr: ".$serveraddr.". Username and password will not be shown.");
                error_log("Database Connect Error: " . $this->conn->connect_error);
                return false;
            }

            return true;
        }

        /**
         * Create a mysqli instance and connect to the database.
         *
         * @param string $dbName The database name
         *
         * @return bool         Result.
         */
        public function selectDB($dbName)
        {

            if  (!mysqli_select_db($this->conn, $dbName))
            {
                $this->l->error("Select database failed. The database specified is: ".$dbName);
                return false;
            }

            return true;
        }

        /**
         * Close the connection.
         *
         * @return bool         Result.
         */
        public function close()
        {
            return $this->conn->close();
        }


        /**
         * Parse mysqli_result to array.
         *
         * For insertion and update: If success, ret [1]. Failed ret [0]
         * For query: return result array [{field1:val1, field2: val1}, {field1: val2, field2: val2}, {field1: val3, field2: val3}]
         *
         * @param mysqli_result  $result   mysqli_result
         *
         * @return array     Result. The same as python. [{field1:val1, field2: val1}, {field1: val2, field2: val2}, {field1: val3, field2: val3}]
         */
        public function parseExecuteResult($result)
        {
            print_r(gettype($result)) ;
            if ($result === true)
                return array(1);

            if ($result === false)
                return array(2);

            $resultArr = array();

            while($row = $result->fetch_assoc())
            {
                array_push($resultArr, $row);
            }

            return $resultArr;

        }
    }

?>