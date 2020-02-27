<?php
    require_once (__DIR__."/FileManager.php");
    require_once (__DIR__."/DirectoryManager.php");
    require_once (__DIR__."/DatetimeManager.php");
	class Logger
	{
		/**
		* Logger - Logging the output.
		*
		*
		* @author: Jingxuan Zhang <jiz176@pitt.edu>
		*
		*/


		/**
		* Log files directory.
		*
		* @var string
		*/
		private $logDir = __DIR__."../../../../log/";


		/**
		* Count of the write time
		*
		* @var int
		*/
		private $writeCount = 0;

        /**
         * Log file path
         *
         * @var string
         */
        private $logFilePath;


        /**
         * Error dump directory path
         *
         * @var string
         */
        private $dumpDirPath;


		/**
		* Constructor
		*
		* @param string      $log_dir      Log file directory
		*/
		public function __construct($logDir="")
		{
		    if ($logDir == "")
            {
                $logDir = $this->logDir;
            }

            $date = DatetimeManager::getCurrentDate();

		    $logFileDir = $logDir."/".$date."/log/";
            $dumpFileDir = $logDir."/".$date."/dump/";

            if(!DirectoryManager::checkExists($logFileDir))
                DirectoryManager::create($logFileDir);

            if(!DirectoryManager::checkExists($dumpFileDir))
                DirectoryManager::create($dumpFileDir);

            $this->logFilePath = $logFileDir.$date.".txt";
            $this->dumpDirPath = $dumpFileDir;

            if (!FileManager::checkExists($this->logFilePath))
                FileManager::create($this->logFilePath);

		}



        /**
         * Dump the stack
         *
         * return false/dumpfilepath
         */
        private function dump()
        {
            $time = DatetimeManager::getMillisecond();

            //Here if the random number is the same, and huge amount of users run the following code simultaneously, they may get the same file name.
            //Lock should be used here.
            //But I think there will not be so many users and the possibility is low. And even if it happens, it will not be a fatal error. So I don't want to waste much time on the logger.
            //TODO: FIX THIS.
            do{
                $randomNum = mt_rand(0,100);
                $dump_file_name = $time.$randomNum.".dump";
                $dump_file_path = $this->dumpDirPath.$dump_file_name;
            } while (FileManager::checkExists($dump_file_path));

            FileManager::create($dump_file_path);


            $dbgTraceArr = debug_backtrace();

            if (!FileManager::checkExists($this->logFilePath))
                FileManager::create($this->logFilePath);

            if (FALSE === file_put_contents($dump_file_path, print_r($dbgTraceArr, true)))
                return false;

            return realpath($dump_file_path);
        }

        /**
         * Base write
         *
         * @param    string         $text      text to write
         * @param    string         $type      "Info"? "Error"? "Debug"?
         * @param    FunctionParamter   $params      parameter class
         */
        private function write($text, $type, $params)
        {

            $line = " ";
            $dbgTraceArr = debug_backtrace();
            $paramDumpStr = "";

            foreach ($dbgTraceArr as $element)
            {
                if ($element["file"] != __FILE__ )
                {
                    $line = $element["line"];
                    break;
                }
            }



            if ($params !== null)
            {
                $paramArr = $params->toArray();
                foreach ($paramArr as $key=>$value)
                {
                    if (is_array($value))
                        $value = implode(" ", $value);

                    $paramDumpStr .= "@param[".$key."] "."= ".$value."; ";
                }

            }

            $fileName = $_SERVER['SCRIPT_NAME'];
            $currentDate = DatetimeManager::getCurrentDate("/");
            $currentTime = DatetimeManager::getCurrentTime(":");
            $content = $currentDate." ".$currentTime." [".$type."] ".$fileName." on line ".$line.":   ".$text.". ".$paramDumpStr.". \r";
            file_put_contents($this->logFilePath, $content, FILE_APPEND);
            $this->writeCount++;
        }


        /**
         * Write error info.
         *
         * @param    string        $text        text to write
         * @param    FunctionParamter   $params      parameter class
         */
        public function error($text, $params=null)
        {
            $file_name = $this->dump();
            if (FALSE !== $file_name)
                $content = ". Dump file path: ".$file_name;
            else
                $content = ". Dump stack error.";
            $this->write($text.$content, "ERROR", $params);
        }

        /**
         * Write log.
         *
         * @param       $text      text to write
         * @param    FunctionParamter   $params      parameter class
         */
        public function log($text, $params=null)
        {
            $this->write($text, "LOG", $params);
        }

        /**
         * Write debug info.
         *
         * @param    string         $text      text to write
         * @param    FunctionParamter   $params     parameter class
         */
        public function debug($text, $params=null)
        {
            $file_name = $this->dump();
            if (FALSE !== $file_name)
                $content = ". Dump file path: ".$file_name;
            else
                $content = ". Dump stack error.";
            $this->write($text.$content, "DEBUG", $params);
        }


        /**
         * Write warning info.
         *
         * @param    string        $text        text to write
         * @param    FunctionParamter   $params      parameter class
         */
        public function warning($text, $params=null)
        {
            $this->write($text, "WARNING", $params);
        }


		
		
	}
		
?>