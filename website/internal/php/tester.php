<?php

/*
*/
/*
    // start connection
    $conn = new mysqli("192.168.1.144", "root", "xuan32546");

    // check connection
    if ($conn->connect_error) {
        error_log("Database Connect Error" . $conn->connect_error);
        die("Something went wrong.");
    }
    mysqli_select_db($conn, "pitt_course" );

    $id = "id";
    $field = "1";
    $field1 = "2";
    $stmt = $conn->prepare('SELECT * FROM subject WHERE id = ? or id = ?');
    $stmt->bind_param('s', $field);
    $stmt->bind_param('s', $field1);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        print_r( $row);
    }


    function test()
    {
        print_r( func_get_args());
    }

    test(1,2,3);
*/
/*
$set = new \Ds\Set();

$set->add(1);
$set->add(1);
$set->add(2);
$set->add(3);

$set2 = new \Ds\Set(array(1,2,3,10));

$set2->add(1);
$set2->add(4);
$set2->add(5);

var_dump($set->union($set2));
*/

/*require_once("lib\Database.php");

$db = new Database("pitt_course");

$result = $db->execute("SELECT * FROM `course` WHERE `unit_low`>= ?","12");
echo count($result->fetch_all(MYSQLI_ASSOC))."\n";*/

require_once("ClassSearcher.php");
$cs = new ClassSearcher();
/*$cs->addSubject("CS", 0);
$cs->addSubject("PHYS", 0);
$cs->addSubject("MATH", 0);
$cs->addSubject("PHYS", 0);*/
/*$cs->addCourseNumber("0401", 1);
$cs->addCourseNumber("0445", 0);*/
//$cs->addCourseName("structure", 0);
//$cs->addUnit(1,1, 0);
$cs->addProfessorName( "Timothy Hoffman", 1);
var_dump($cs->getData(-1));
//$cs->addProfessorNation( "United States", 1);
//$cs->addProfessorRating( 1, 12,1);
//$cs->addProfessorDifficulty( 1, 10,1);
//$cs->addCareer("Undergraduate", 1);
/*
echo $cs->count()."\n";
echo $cs->getTotalPage();
var_dump($cs->getData(-1));
*/

/*$a = array(
    "one" => 1,
    "two" => 2,
    "three" => 3,
    "seventeen" => 17
);

foreach ($a as $k => $v) {
    echo "\$a[$k] => $v.\n";
}*/

/*require_once("ProfessorSearcher.php");
$ps = new ProfessorSearcher();
$ps->addName("Michael Devine");
$ps->addName("Jeffrey Cooper");
$ps->addName("Staff");
var_dump($ps->resultSet);*/

?>