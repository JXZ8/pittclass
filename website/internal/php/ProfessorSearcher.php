<?php
    require_once("lib/Database.php");
    require_once("lib/Logger.php");

    class ProfessorSearcher
    {
        //search for professor info


        /**
         * Class to handle class searching
         */
        const SET_DISJUNCTION = 0;
        const SET_CONJUNCTION = 1;
        const SET_XOR = 2;


        /**
         * Database instance
         *
         * @var     Database
         */
        private $db;


        /**
         * Result set
         *
         * @var     Set
         */
        private $resultSet; //Public is just for tester. CHANGE THIS TO private!!

        /**
         * Select field of sql statement. If the json needed by front end changes, change this variable.
         *
         * @var string
         */
        private static $SELECT_FIELD = "`rmp_link`, `rmp_rating`, `rmp_difficulty`, `instructor_name`";

        /**
         * If the result set has been filled out, true. Otherwise, false
         *
         * @var     bool
         */
        private $isResultSetFilled;

        /**
         * Constructor
         *
         */
        public function __construct()
        {
            $this->db = new Database("pitt_course");
            $this->logger = new Logger();
            $this->resultSet = new \Ds\Set();
            $this->isResultSetFilled = false;
        }


        /**
         * Add result from name search to result set
         *
         * @param   string      $name       specified name;
         */
        public function addName($name)
        {
            $resultArr = $this->db->execute('SELECT '.ProfessorSearcher::$SELECT_FIELD.' FROM `instructor` INNER JOIN `instructor_info` ON `instructor`.`instructor_id` = `instructor_info`.`instructor_id` WHERE `instructor`.`instructor_name` = ?', $name)->fetch_all(MYSQLI_ASSOC);

            if (!$this->isResultSetFilled)
            {
                $this->resultSet = new \Ds\Set($resultArr);
                $this->isResultSetFilled = true;
            }
            else {
                //dis con xor
                $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), ProfessorSearcher::SET_DISJUNCTION);
            }

        }


        /**
         * Helper function. Disjunction, conjunction, xor to the result set
         *
         * @param    Set      $set                  Set to add to relation
         * @param   int      $setOperation    0 disjunction 1 conjunction 2 xor
         *
         * @return  Set      The third set that is handled from the $set and the $this->resultSet
         */
        private function handleSet($set, $setOperation)
        {
            $resultSet = null;

            if($setOperation == ProfessorSearcher::SET_DISJUNCTION)
            {
                $resultSet = $this->resultSet->union($set);
            }
            else if ($setOperation == ProfessorSearcher::SET_CONJUNCTION)
            {
                $resultSet = $this->resultSet->intersect($set);
            }
            else if ($setOperation == ProfessorSearcher::SET_XOR)
            {
                $resultSet = $this->resultSet->xor($set);
            }
            else
            {
                //error
                $this->logger->error("Undefined set operation in handleSet()");
            }
            return $resultSet;
        }

        /**
         * Get the result array
         */
        public function getData()
        {
            return $this->resultSet;
        }

        /**
         * Remove all the data in the set
         */
        public function clear()
        {
            return $this->resultSet->clear();
        }
}