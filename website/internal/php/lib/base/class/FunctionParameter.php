<?php
    require_once(__DIR__."/../interface/IArrayable.php");
    require_once(__DIR__."/../../Logger.php");


    class FunctionParameter implements IArrayable
    {
        /**
         * The parameters of a function.
         *
         * How to use this: new FunctionParamter("var1;var2;var3", $var1, $var2, $var3);
         *
         * @author: Jingxuan Zhang <jiz176@pitt.edu>
         */


        /**
         * Parameter value arr of the function. e.g. ["value1", "value2", "value3"]
         *
         * @var array
         */
        private $parameterValueArr;

        /**
         * Parameter name arr of the function. e.g. ["parameter1", "parameter2", "parameter3"]
         *
         * @var array
         */
        private $parameterNameArr;

        /**
         * Logger.
         *
         * @var Logger()
         */
        private $l;


        /**
         * Constructor.
         *
         * @param   string             $paramterName                                                       The name of the parameters. Use ";" to separate them
         * @param   uncertain param    $functionParameter1, $functionParameter2, $functionParameter3 ...   The parameter of a function
         */
        public function __construct($paramterName)
        {
            $this->l = new Logger(__DIR__."/../../../log");
            $this->parameterValueArr = array();

            $paramValueArr = func_get_args();
            array_shift($paramValueArr);

            $this->parameterNameArr = explode(";", $paramterName);

            foreach( $paramValueArr as $paramValue ){
                array_push($this->parameterValueArr, $paramValue);
            }
        }


        /**
         * @param uncertain param
         *
         * @return array        to array
         */
        public function toArray()
        {
            if (sizeof($this->parameterValueArr) != sizeof($this->parameterNameArr))
            {
                $this->l->error("The number of parameters' names passed in is not the same as the number of parameters' values in FunctionParameter::toArray().", new FunctionParameter("parameterNameArr;parameterValueArr", $this->parameterNameArr, $this->parameterValueArr));
                return;
            }


            $resultArr = array();

            for ($i = 0, $len = sizeof($this->parameterNameArr); $i < $len; $i++)
                $resultArr[$this->parameterNameArr[$i]] = $this->parameterValueArr[$i];

            return $resultArr;

        }
    }


?>