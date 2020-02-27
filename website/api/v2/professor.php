<?php
    require_once("../../internal/php/ProfessorSearcher.php");
    header('Content-Type:application/json');

    $professorSearcher = new professorSearcher();

    if (isset($_GET['pname']))
    {
        $pnameList = $_GET['pname'];
        foreach($pnameList as $pname)
            $professorSearcher->addName($pname);

    }

    $resultSet = $professorSearcher->getData();

    if ($resultSet->count() == 0)
    {
        echo '{"total_count": 0, "data": []}';
        exit();
    }

    $returnArray = array() ;
    $returnArray["count"] = $resultSet->count();

    $dataArray = array();
    for ($i = 0, $count = $resultSet->count(); $i < $count; $i++)
    {
        $tempArr = array();
        $tempArr["name"] = $resultSet->get($i)["instructor_name"];
        $tempArr["rmp_link"] = $resultSet->get($i)["rmp_link"];
        $tempArr["rating"] = $resultSet->get($i)["rmp_rating"];
        $tempArr["difficulty"] = $resultSet->get($i)["rmp_difficulty"];
        array_push($dataArray, $tempArr);
    }
    $returnArray["data"] = $dataArray;
    //var_dump($returnArray);
    echo json_encode($returnArray);
    //{"count": ?, "data":[{"name":"zjx", "rmp_link": "http://link", "rating": 5.0, "difficulty": 1.0}]}