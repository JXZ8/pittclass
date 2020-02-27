<?php
    require_once(__DIR__."/base/interface/IFileSystem.php");

    class DirectoryManager implements IFileSystem
    {

        /**
         *Check file/directory exists
         *
         * @param      $path     Path of the file/directory
         *
         * @return bool
         */
        public static function checkExists($path)
        {
            return is_dir($path);
        }

        /**
         *Create the file/directory
         *
         * @param      $path     Path of the file/directory
         *
         * @return int 1:success      -1:already exists     -2: unknown error
         */
        public static function create($path)
        {
            if (!self::checkExists($path))
            {
                if (mkdir($path, 0777, true))
                {
                    return self::FILE_SUCCESS;
                }
                return self::FILE_UNKNOWN_ERROR;
            }
            return self::FILE_ALREADY_EXIST_ERROR;
        }

        /**
         *Delete the file/directory.
         *Because can't use "delete()" as the function name. Deletep means delete path.
         *
         * @param      $path     Path of the file/directory
         *
         * @return int
         */
        public static function deletep($path)
        {
            if(is_dir($path)){
                $files = glob( $path . '*', GLOB_MARK ); //GLOB_MARK adds a slash to directories returned

                foreach( $files as $file ){
                    if (self::deletep( $file )!= self::FILE_SUCCESS)
                        return self::FILE_UNKNOWN_ERROR;
                }

                if (!rmdir( $path ))
                    return self::FILE_UNKNOWN_ERROR;

            } elseif(is_file($path)) {

                if (!unlink( $path ))
                    return self::FILE_UNKNOWN_ERROR;

            }
            return self::FILE_SUCCESS;

        }
    }

?>