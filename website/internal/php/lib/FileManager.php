<?php
	require_once(__DIR__."/base/interface/IFileSystem.php");
	
	class FileManager implements IFileSystem
	{
		/**
		* File manager class that can manage file. Create, write, delete, etc.
		*
		* @author: Jingxuan Zhang <jiz176@pitt.edu>
		*/


        /**
         *Check file/directory exists
         *
         * @param      $path     Path of the file/directory
         *
         * @return bool
         */
        public static function checkExists($path)
        {
            return is_file($path);
        }

        /**
         * Create the file/directory
         *
         * @param      $path     Path of the file/directory
         *
         * @return int 1:success      -1:already exists     -2: unknown error
         */
        public static function create($path)
        {
            if (self::checkExists($path))
            {
                return self::FILE_ALREADY_EXIST_ERROR;
            }

            $f = fopen($path, "w");

            if (!$f)
            {
                return self::FILE_UNKNOWN_ERROR;
            }

            fclose($f);
            return self::FILE_SUCCESS;
        }

        /**
         * Delete the file/directory.
         * Because can't use "delete()" as the function name. Deletep means delete path.
         *
         * @param      $path     Path of the file/directory
         *
         * @return int status code
         */
        public static function deletep($path)
        {
            if (!ulink($path))
                return self::FILE_UNKNOWN_ERROR;
            return self::FILE_SUCCESS;
        }


    }
?>