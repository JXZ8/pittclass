<?php
	interface IFileSystem
	{
		/**
		*Interface for file system.
		*
		*@author: Jingxuan Zhang <jiz176@pitt.edu>
		*
		*/


        /**
         * Unable to create file/directory. Already exist. Error code.
         *
         * @var int
         */
        const FILE_ALREADY_EXIST_ERROR = -1;

        /**
         * Unknown error. Error code.
         *
         * @var int
         */
        const FILE_UNKNOWN_ERROR = -2;

        /**
         * Create file success. Success code.
         *
         * @var int
         */
        const FILE_SUCCESS = 1;

		
		
		/**
		*Check file/directory exists
		*
		*@param      $path     Path of the file/directory
		*
		*@return bool
		*/
		public static function checkExists($path);
		
		/**
		*Create the file/directory
		*
		*@param      $path     Path of the file/directory
		*
		*@return int 1:success      -1:already exists     -2: unknown error
        *
		*/
		public static function create($path);
		
		/**
		*Delete the file/directory. 
		*Because can't use "delete()" as the function name. Deletep means delete path.
		*
		*@param      $path     Path of the file/directory
		*
		*@return int status code
		*/
		public static function deletep($path);
		
	}
?>