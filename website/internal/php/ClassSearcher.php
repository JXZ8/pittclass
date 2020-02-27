<?php
    require_once("lib/Database.php");
    require_once("lib/Logger.php");


	class ClassSearcher
	{

		/**
		 * Class to handle class searching
		 */
        const SET_DISJUNCTION = 0;
        const SET_CONJUNCTION = 1;
        const SET_XOR = 2;

        const RESULT_IN_ONE_PAGE = 10;

        /**
         * Select field of sql statement. If the json needed by front end changes, change this variable.
         *
         * @var string
         */
        private static $SELECT_FIELD = "`name`, `class_id`, `time`, `day`, `duration`, `unit_low`, `unit_high`, `place`, `period`, `type`, `instructor_name`, `nation`";


        /**
         * Result set
         *
         * @var     Set
         */
        private $resultSet; //Public is just for tester. CHANGE THIS TO private!!


        /**
         * Database instance
         *
         * @var     Database
         */
        private $db;

        /**
         * Filled result set
         *
         * @var     bool
         */
        private $filledSet;

        /**
         * Logger instance
         *
         * @var     Logger
         */
        private $logger;


        /**
         * If the result set has been filled out, true. Otherwise, false
         *
         * @var     bool
         */
        private $isResultSetChanged;

		/**
		 * Constructor
         *
		 */
		public function __construct()
		{
		    $this->isResultSetChanged  = false;
            $this->resultSet = new \Ds\Set();
            $this->db = new Database("pitt_course");
            $this->filledSet = False; //?wtf is this
            $this->logger = new Logger();
		}

		/**
		 * Add result from subject search to result set
		 *
		 * @params   string   $subject              specified subject index. Like ADMJ CS etc
		 * @params   int      $resultSetRelation    0 disjunction 1 conjunction 2 xor
		 *
		 */
		public function addSubject($subject, $resultSetRelation)
        {
            $resultArr = $this->db->execute('SELECT '.ClassSearcher::$SELECT_FIELD.' FROM (`subject` INNER JOIN `course` ON `subject`.`major_id`=`course`.`major_id`) INNER JOIN `class` ON `class`.`course_id` = `course`.`course_id`  LEFT JOIN `instructor` ON `instructor`.`instructor_id` = `class`.`instructor_id` WHERE `subject`.`subject_index` = ? ORDER BY `course`.`name`, `class_id` ASC', $subject)->fetch_all(MYSQLI_ASSOC);
            if (!$this->isResultSetChanged)
            {
                $this->resultSet = new \Ds\Set($resultArr);
                $this->isResultSetChanged = true;
            }
            else {
                //dis con xor
                $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), $resultSetRelation);
            }
        }

        /**
         * Add result from course number search to result set
         * Notice: course number should be 0401. There should be 0 in front of the 401. Otherwise there might be 4401 included.
         *
         * @param    String      $courseNum             Course number to add
         * @params   int         $resultSetRelation    0 disjunction 1 conjunction 2 xor
         *
         */
        public function addCourseNumber($courseNum, $resultSetRelation)
        {
            //handle courseNum
            $courseNum = "% ".$courseNum." %";

            $resultArr = $this->db->execute("SELECT ".ClassSearcher::$SELECT_FIELD." FROM `course` INNER JOIN `class` ON `class`.`course_id` = `course`.`course_id` LEFT JOIN `instructor` ON `class`.`instructor_id` = `instructor`.`instructor_id` WHERE `course`.`name` like ? ORDER BY `course`.`name`, `class_id` ASC", $courseNum)->fetch_all(MYSQLI_ASSOC);
            if (!$this->isResultSetChanged)
            {
                $this->resultSet = new \Ds\Set($resultArr);
                $this->isResultSetChanged = true;
            }
            else {
                //dis con xor
                $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), $resultSetRelation);
            }

        }

        /**
         * Add result from course name search to result set.
         *
         * @param   String    $courseName           Course name that is included.
         * @param   int       $resultSetRelation    0 disjunction 1 conjunction 2 xor
         */
        public function addCourseName($courseName, $resultSetRelation)
        {
            $courseName = "%".$courseName."%";
            $resultArr = $this->db->execute("SELECT ".ClassSearcher::$SELECT_FIELD." FROM `course` INNER JOIN `class` ON `class`.`course_id` = `course`.`course_id` LEFT JOIN `instructor` ON `class`.`instructor_id` = `instructor`.`instructor_id` WHERE `course`.`name` like ? ORDER BY `course`.`name`, `class_id` ASC", $courseName)->fetch_all(MYSQLI_ASSOC);
            if (!$this->isResultSetChanged)
            {
                $this->resultSet = new \Ds\Set($resultArr);
                $this->isResultSetChanged = true;
            }
            else {
                //dis con xor
                $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), $resultSetRelation);
            }
        }

        /**
         * Add result from unit search to result set
         *
         * @param   int     $unitLow        Unit low bound
         * @param   int     $unitHigh       Unit high bound
         * @param   int       $resultSetRelation    0 disjunction 1 conjunction 2 xor
         */
        public function addUnit($unitLow, $unitHigh, $resultSetRelation)
        {
            //If conjunction and there exists result in result set, just select from the result set. Otherwise, it will cost plenty of time.
            if ($resultSetRelation == ClassSearcher::SET_CONJUNCTION && $this->isResultSetChanged)
            {
                //Create a new set
                $resultSet = new \Ds\Set();

                //Traverse the set
                $count = $this->resultSet->count();
                for ($i = 0; $i < $count; $i++)
                {
                    $dataArr = $this->resultSet->get($i);
                    if ($dataArr["unit_low"] >= $unitLow && $dataArr["unit_high"] <= $unitHigh)
                        $resultSet->add($dataArr);
                }
                $this->resultSet = $resultSet;
            }
            else
            {
                $resultArr = $this->db->execute("SELECT ".ClassSearcher::$SELECT_FIELD." FROM `course` INNER JOIN `class` ON `class`.`course_id` = `course`.`course_id` LEFT JOIN `instructor` ON `instructor`.`instructor_id` = `class`.`instructor_id` WHERE `course`.`unit_low` >= ? AND `course`.`unit_high` <= ? ORDER BY `course`.`name`, `class_id` ASC", $unitLow, $unitHigh )->fetch_all(MYSQLI_ASSOC);

                if (!$this->isResultSetChanged)
                {
                    $this->resultSet = new \Ds\Set($resultArr);
                    $this->isResultSetChanged = true;

                }
                else {
                    //dis con xor
                    $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), $resultSetRelation);
                }
            }
        }


        /**
         * Add class time duration. Like 09:00-18:00
         *
         * @param   int     $startTime      Time stamp. Suppose timestamp of 00:00 is 0.
         * @param   int     $endTime        Time stamp. Suppose timestamp of 00:00 is 0.
         * @param   int       $resultSetRelation    0 disjunction 1 conjunction 2 xor
         */
        public function addTime($startTime, $endTime, $resultSetRelation)
        {

        }


       /**
         * Add professor name.
         *
         * @param   String    $professorName        Professor name
         * @param   int       $resultSetRelation    0 disjunction 1 conjunction 2 xor
         */
        public function addProfessorName($professorName, $resultSetRelation)
        {
            $professorName = trim($professorName);
            $professorName = str_replace(' ', '%', $professorName);
            $professorName = "%".$professorName."%";
            $resultArr = $this->db->execute('SELECT ' . ClassSearcher::$SELECT_FIELD . ' FROM  (SELECT * FROM `instructor`  WHERE `instructor`.`instructor_name` LIKE ?) AS T INNER JOIN `class` ON `T`.`instructor_id`=`class`.`instructor_id` INNER JOIN `course` ON `class`.`course_id` = `course`.`course_id` ORDER BY `course`.`name`, `class_id` ASC', $professorName)->fetch_all(MYSQLI_ASSOC);

            if (!$this->isResultSetChanged)
            {
                $this->resultSet = new \Ds\Set($resultArr);
                $this->isResultSetChanged = true;
            }
            else {
                //dis con xor
                $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), $resultSetRelation);
            }
        }

        /**
         * Add professor name.
         *
         * @param   String    $nation               Professor nation
         * @param   int       $resultSetRelation    0 disjunction 1 conjunction 2 xor
         */
        public function addProfessorNation($nation, $resultSetRelation)
        {

            //If conjunction and there exists result in result set, just select from the result set. Otherwise, it will cost plenty of time.
            if ($resultSetRelation == ClassSearcher::SET_CONJUNCTION && $this->isResultSetChanged)
            {
                //Create a new set
                $resultSet = new \Ds\Set();

                //Traverse the set
                $count = $this->resultSet->count();
                for ($i = 0; $i < $count; $i++)
                {
                    $dataArr = $this->resultSet->get($i);
                    if ($dataArr["nation"] == $nation)
                        $resultSet->add($dataArr);
                }
                $this->resultSet = $resultSet;
            }
            else {
                $resultArr = $this->db->execute('SELECT ' . ClassSearcher::$SELECT_FIELD . ' FROM (SELECT `instructor_id`, `instructor_name`,`nation` FROM `instructor` WHERE `instructor`.`nation` = ?) as T INNER JOIN `class` ON `class`.`instructor_id` = `T`.`instructor_id` INNER JOIN `course` ON `course`.`course_id` = `class`.`course_id` ORDER BY `course`.`name`, `class_id` ASC', $nation)->fetch_all(MYSQLI_ASSOC);
                if (!$this->isResultSetChanged) {
                    $this->resultSet = new \Ds\Set($resultArr);
                    $this->isResultSetChanged = true;
                } else {
                    //dis con xor
                    $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), $resultSetRelation);
                }
            }

        }

        /**
         * Add professor rating.
         *
         * @param   int       $ratingLow            Rating low bound
         * @param   int       $ratingHigh           Rating high bound
         * @param   int       $resultSetRelation    0 disjunction 1 conjunction 2 xor
         */
        public function addProfessorRating($ratingLow, $ratingHigh, $resultSetRelation)
        {
            $resultArr = $this->db->execute('SELECT ' . ClassSearcher::$SELECT_FIELD . ' FROM (SELECT `class_id`,`section_name`, `course_id`, `time`, `day`,`duration`, `place`, `T`.`instructor_id`, `period`, `type` FROM (SELECT `instructor_id` FROM `instructor_info` WHERE `rmp_rating` >= ? and `rmp_rating` <= ?) AS T INNER JOIN `class` ON `class`.`instructor_id` = `T`.`instructor_id`) AS T1 LEFT JOIN `course` ON `course`.`course_id` = `T1`.`course_id` LEFT JOIN `instructor` ON `T1`.`instructor_id` = `instructor`.`instructor_id` ORDER BY `name`,`class_id`  ASC ', $ratingLow, $ratingHigh)->fetch_all(MYSQLI_ASSOC);
            //$resultArr = $this->db->execute('SELECT `name`, `class_id`, `time`, `day`, `duration`, `unit_low`, `unit_high`, `place`, `period`, `type`, `instructor_name`, `nation` FROM (SELECT `class_id`,`section_name`, `course_id`, `time`, `day`,`duration`, `place`, `T`.`instructor_id`, `period`, `type` FROM (SELECT `instructor_id` FROM `instructor_info` WHERE `rmp_rating` >= 1 and `rmp_rating` <= ?) AS T INNER JOIN `class` ON `class`.`instructor_id` = `T`.`instructor_id`) AS T1 LEFT JOIN `course` ON `course`.`course_id` = `T1`.`course_id` LEFT JOIN `instructor` ON `T1`.`instructor_id` = `instructor`.`instructor_id` ORDER BY `name` ASC', '2')->fetch_all(MYSQLI_ASSOC);
            if (!$this->isResultSetChanged) {
                $this->resultSet = new \Ds\Set($resultArr);
                $this->isResultSetChanged = true;
            } else {
                //dis con xor
                $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), $resultSetRelation);
            }
        }

        /**
         * Add professor difficulty.
         *
         * @param   int       $difficultyLow         Difficulty low bound
         * @param   int       $difficultyHigh        Difficulty high bound
         * @param   int       $resultSetRelation     0 disjunction 1 conjunction 2 xor
         */
        public function addProfessorDifficulty($difficultyLow, $difficultyHigh, $resultSetRelation)
        {
            $resultArr = $this->db->execute('SELECT ' . ClassSearcher::$SELECT_FIELD . ' FROM (SELECT `class_id`,`section_name`, `course_id`, `time`, `day`,`duration`, `place`, `T`.`instructor_id`, `period`, `type` FROM (SELECT `instructor_id` FROM `instructor_info` WHERE `rmp_difficulty` >= ? and `rmp_difficulty` <= ?) AS T INNER JOIN `class` ON `class`.`instructor_id` = `T`.`instructor_id`) AS T1 LEFT JOIN `course` ON `course`.`course_id` = `T1`.`course_id` LEFT JOIN `instructor` ON `T1`.`instructor_id` = `instructor`.`instructor_id` ORDER BY `name`, `class_id` ASC ', $difficultyLow, $difficultyHigh)->fetch_all(MYSQLI_ASSOC);
            if (!$this->isResultSetChanged) {
                $this->resultSet = new \Ds\Set($resultArr);
                $this->isResultSetChanged = true;
            } else {
                //dis con xor
                $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), $resultSetRelation);
            }
        }


        /**
         * Add career.
         *
         * @param   String    $career                Career
         * @param   int       $resultSetRelation     0 disjunction 1 conjunction 2 xor
         */
        public function addCareer($career, $resultSetRelation)
        {
            //SELECT * FROM `course` INNER JOIN `class` ON `class`.`course_id` = `course`.`course_id` LEFT JOIN `instructor` ON `class`.`instructor_id` = `instructor`.`instructor_id` WHERE `career` = "Graduate"
            $resultArr = $this->db->execute('SELECT '.ClassSearcher::$SELECT_FIELD.' FROM `course` INNER JOIN `class` ON `class`.`course_id` = `course`.`course_id` LEFT JOIN `instructor` ON `class`.`instructor_id` = `instructor`.`instructor_id` WHERE `career` = ?', $career)->fetch_all(MYSQLI_ASSOC);
            if (!$this->isResultSetChanged) {
                $this->resultSet = new \Ds\Set($resultArr);
                $this->isResultSetChanged = true;
            } else {
                //dis con xor
                $this->resultSet = $this->handleSet(new \Ds\Set($resultArr), $resultSetRelation);
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

            if($setOperation == ClassSearcher::SET_DISJUNCTION)
            {
                $resultSet = $this->resultSet->union($set);
            }
            else if ($setOperation == ClassSearcher::SET_CONJUNCTION)
            {
                $resultSet = $this->resultSet->intersect($set);
            }
            else if ($setOperation == ClassSearcher::SET_XOR)
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
         * Combine result set with another classSearcher instance
         *
         * @param   classSearcher    $classSearcherOther    Another classSearcher instance
         * @param   int              $setOperation          0 disjunction 1 conjunction 2 xor
         */
        public function combineResult($classSearcherOther, $setOperation)
        {
            if($setOperation == ClassSearcher::SET_DISJUNCTION)
            {
                $this->resultSet = $this->resultSet->union($classSearcherOther->resultSet);
            }
            else if ($setOperation == ClassSearcher::SET_CONJUNCTION)
            {
                $this->resultSet = $this->resultSet->intersect($classSearcherOther->resultSet);
            }
            else if ($setOperation == ClassSearcher::SET_XOR)
            {
                $this->resultSet = $this->resultSet->xor($classSearcherOther->resultSet);
            }
            else
            {
                //error
                $this->logger->error("Undefined set operation in handleSet()");
                return;
            }
            $this->isResultSetChanged = true;
        }


        /**
         * If result set != null, return true. Else return false
         *
         * @return  bool    True if result set, otherwise false
         */
        public function hasResult()
        {
            return $this->isResultSetChanged;
        }

        /**
         * Get the result set.
         *
         * @params  int     $pageNum        Page Number
         *
         * @return \DS\Set
         */
        public function getData($pageNum = -1)
        {
            if ($pageNum == -1)
                return $this->resultSet;
            return $this->resultSet->slice(ClassSearcher::RESULT_IN_ONE_PAGE * $pageNum, ClassSearcher::RESULT_IN_ONE_PAGE);
        }

        /**
         * Get total page
         *
         * @return  int     Total page num
         */
        public function getTotalPage()
        {
            return ceil($this->resultSet->count()/ClassSearcher::RESULT_IN_ONE_PAGE);
        }

        /**
         * Get total count
         *
         * @return   int    Total data count in the result set
         */
        public function count()
        {
            return $this->resultSet->count();
        }

	}


?>