<?php
    require_once("../../internal/php/ClassSearcher.php");
    require_once("../../internal/php/ProfessorSearcher.php");
    header('Content-Type:application/json');

    $classSearcher = new ClassSearcher();
    $professorSearcher = new ProfessorSearcher();

    $page = 0;

    if(!isset($_GET['page']))
    {
        //header set to 400
        echo "400 hd";
        exit();
    }
    else{
        $page = $_GET['page'];
    }

    //major
    if (isset($_GET['major']))
    {
        $majorSearcher = new ClassSearcher();
        $majorList = $_GET['major'];
        foreach($majorList as $major)
            $majorSearcher->addSubject($major, ClassSearcher::SET_DISJUNCTION);
        if ($classSearcher->hasResult())
        {
            $classSearcher->combineResult($majorSearcher, ClassSearcher::SET_CONJUNCTION);
        }
        else
        {
            $classSearcher->combineResult($majorSearcher, ClassSearcher::SET_DISJUNCTION);
        }
    }

    //course number should be toghter with course name
    if (isset($_GET['cnum']) || isset($_GET['cname']))
    {
        $courseNumberNameSearcher = new ClassSearcher();
        if (isset($_GET['cnum']) )
        {
            $courseNumberList = $_GET['cnum'];
            foreach($courseNumberList as $courseNumber)
                $courseNumberNameSearcher->addCourseNumber($courseNumber, ClassSearcher::SET_DISJUNCTION);
        }
        if (isset($_GET['cname']) )
        {
            $courseNameList = $_GET['cname'];
            foreach($courseNameList as $courseName)
                $courseNumberNameSearcher->addCourseNumber($courseName, ClassSearcher::SET_DISJUNCTION);
        }


        if ($classSearcher->hasResult())
        {
            $classSearcher->combineResult($courseNumberNameSearcher, ClassSearcher::SET_CONJUNCTION);
        }
        else
        {
            $classSearcher->combineResult($courseNumberNameSearcher, ClassSearcher::SET_DISJUNCTION);
        }
    }

    //course unit low and high 有bug
    if (isset($_GET['uLow']) && isset($_GET['uHigh']))
    {
        $unitSearcher = new ClassSearcher();
        $unitSearcher->addUnit($_GET['uLow'], $_GET['uHigh'],ClassSearcher::SET_DISJUNCTION);

        if ($classSearcher->hasResult())
        {
            $classSearcher->combineResult($unitSearcher, ClassSearcher::SET_CONJUNCTION);
        }
        else
        {
            $classSearcher->combineResult($unitSearcher, ClassSearcher::SET_DISJUNCTION);
        }
    }

    //professorName
    if (isset($_GET['pname']))
    {
        $professorSearcher = new ClassSearcher();
        $professorList = $_GET['pname'];
        foreach($professorList as $professorName)
            $professorSearcher->addProfessorName($professorName, ClassSearcher::SET_DISJUNCTION);
        if ($classSearcher->hasResult())
        {
            $classSearcher->combineResult($professorSearcher, ClassSearcher::SET_CONJUNCTION);
        }
        else
        {
            $classSearcher->combineResult($professorSearcher, ClassSearcher::SET_DISJUNCTION);
        }
    }

    //professorNation
    if (isset($_GET['pn']))
    {
        $professorNationSearcher = new ClassSearcher();
        $professorNationList = $_GET['pn'];
        foreach($professorNationList as $nation)
            $professorNationSearcher->addProfessorNation($nation, ClassSearcher::SET_DISJUNCTION);
        if ($classSearcher->hasResult())
        {
            $classSearcher->combineResult($professorNationSearcher, ClassSearcher::SET_CONJUNCTION);
        }
        else
        {
            $classSearcher->combineResult($professorNationSearcher, ClassSearcher::SET_DISJUNCTION);
        }
    }

    //professorRating
    if (isset($_GET['prLow']) && isset($_GET['prHigh']))
    {
        $professorRatingSearcher = new ClassSearcher();
        $professorRatingSearcher->addProfessorRating($_GET['prLow'], $_GET['prHigh'],ClassSearcher::SET_DISJUNCTION);

        if ($classSearcher->hasResult())
        {
            $classSearcher->combineResult($professorRatingSearcher, ClassSearcher::SET_CONJUNCTION);
        }
        else
        {
            $classSearcher->combineResult($professorRatingSearcher, ClassSearcher::SET_DISJUNCTION);
        }
    }

    //professorDifficulty
    if (isset($_GET['pdLow']) && isset($_GET['pdHigh']))
    {
        $professorDifficultySearcher = new ClassSearcher();
        $professorDifficultySearcher->addProfessorDifficulty($_GET['pdLow'], $_GET['pdHigh'],ClassSearcher::SET_DISJUNCTION);

        if ($classSearcher->hasResult())
        {
            $classSearcher->combineResult($professorDifficultySearcher, ClassSearcher::SET_CONJUNCTION);
        }
        else
        {
            $classSearcher->combineResult($professorDifficultySearcher, ClassSearcher::SET_DISJUNCTION);
        }
    }

    //career
    if (isset($_GET['career']))
    {
        $careerSearcher = new ClassSearcher();
        $careerList = $_GET['career'];
        foreach($careerList as $career)
            $careerSearcher->addCareer($career, ClassSearcher::SET_DISJUNCTION);
        if ($classSearcher->hasResult())
        {
            $classSearcher->combineResult($careerSearcher, ClassSearcher::SET_CONJUNCTION);
        }
        else
        {
            $classSearcher->combineResult($careerSearcher, ClassSearcher::SET_DISJUNCTION);
        }
    }

    $dataSet = $classSearcher->getData($page);

    //process dataset, converting it to json.
    $courseCount = 0;
    $tempClassCount = 0;

    //json
    $finalJson = [];
    $jsonData = [];
    $courseJson = [];
    $tempJson = [];
    $tempClassDataJson = [];
    $tempSingleClassDataJson = [];

    //temp variables

    if ($dataSet->count() != 0)
    {
        $lastCourseName = $dataSet->get(0)["name"];
    }else
    {
        $lastCourseName = "";
    }



    //Traverse the set
    for($i = 0; $i < $dataSet->count(); $i++)
    {
        if (strcmp($lastCourseName, $dataSet->get($i)["name"]) != 0)
        {
            //increase course name
            $courseCount++;
            //set course name to current course name
            $tempJson["course_name"] = $lastCourseName;
            //update class count
            $tempJson["class_count"] = $tempClassCount;
            //update class data
            $tempJson["classes"] = $tempClassDataJson;
            //update temp json to coursejson
            array_push($courseJson, $tempJson);

            //set the last course name
            $lastCourseName = $dataSet->get($i)["name"];

            //reset
            $tempClassCount = 0;
            $tempJson = [];
            $tempClassDataJson = [];
        }
        $tempClassCount++;
        $tempSingleClassDataJson["time"] = $dataSet->get($i)["time"];
        $tempSingleClassDataJson["class_id"] = $dataSet->get($i)["class_id"];
        $tempSingleClassDataJson["duration"] = $dataSet->get($i)["duration"];

        //constructing day array
        $tempDayDict = $dataSet->get($i)["day"];
        $tempDayDict = json_decode(str_replace("'","\"",$tempDayDict));
        $tempDayArray = array();

        foreach ($tempDayDict as $k => $v) {
            array_push($tempDayArray, $v);
        }
        $tempSingleClassDataJson["day"] = $tempDayArray;


        $tempSingleClassDataJson["period"] = $dataSet->get($i)["period"];
        $tempSingleClassDataJson["place"] = $dataSet->get($i)["place"];
        $tempSingleClassDataJson["instructor_name"] = $dataSet->get($i)["instructor_name"];

        //dirty code because of bad planning :(
        $professorSearcher->addName($dataSet->get($i)["instructor_name"]);
        if ($professorSearcher->getData()->count() != 0)
        {
            $tempSingleClassDataJson["rmp_link"] = $professorSearcher->getData()->get(0)["rmp_link"];
            $tempSingleClassDataJson["rating"] = $professorSearcher->getData()->get(0)["rmp_rating"];
            $tempSingleClassDataJson["difficulty"] = $professorSearcher->getData()->get(0)["rmp_difficulty"];
        }
        else
        {
            $tempSingleClassDataJson["rmp_link"] = "";
            $tempSingleClassDataJson["rating"] = "";
            $tempSingleClassDataJson["difficulty"] = "";
        }

        $tempSingleClassDataJson["nation"] = $dataSet->get($i)["nation"];
        $tempSingleClassDataJson["classType"] = $dataSet->get($i)["type"];
        array_push($tempClassDataJson, $tempSingleClassDataJson);

        $professorSearcher->clear();
    }


    //if there are remaining courses
    if ($tempClassCount > 0)
    {
        //increase course name
        $courseCount++;
        //set course name to current course name
        $tempJson["course_name"] = $lastCourseName;
        //update class count
        $tempJson["class_count"] = $tempClassCount;
        //update class data
        $tempJson["classes"] = $tempClassDataJson;
        //update temp json to coursejson
        array_push($courseJson, $tempJson);
    }


    $jsonData["course_count"] = $courseCount;
    $jsonData["class_count"] = $dataSet->count();
    $jsonData["courses"] = $courseJson;

    $finalJson["last_page"] = $classSearcher->getTotalPage() - 1;
    $finalJson["total_class_count"] = $classSearcher->count();
    $finalJson["data"] = $jsonData;
    //return json
    echo json_encode($finalJson);

//course_count

//course_name
//class_count

//time, duration, day, period, place, professor_name, nation, classType
?>