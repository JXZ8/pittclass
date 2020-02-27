<?php
include_once("conn.php");
header('Content-Type:application/json');

$data_array = array();

if (!isset($_GET["action"]))
{
	header('HTTP/1.1 400 Bad Request');
	exit();
}

$action = $_GET["action"];

if ($action == 'getName')
{
	$sql_string = "";
	
	if (!isset($_GET["q"]))
	{
		$sql_string = 'SELECT department, instructor_name FROM professor_info';
	}
	else
	{
		$letter_in_name = $_GET["q"];
		$sql_string = 'SELECT department, instructor_name FROM professor_info WHERE instructor_name like "%'.$letter_in_name.'%"';
	}
	
	$results = $conn -> query($sql_string);
	while ($row = mysqli_fetch_array($results))
	{
		$temp_dict = array();
		$temp_dict["department"] = $row['department'];
		$temp_dict["professor_name"] = $row['instructor_name'];
		array_push($data_array, $temp_dict);
	}
	if (count($data_array)>6)
	{
		$data_array = array_slice($data_array,0,6);
	}
	
	echo json_encode($data_array);
	
}
else if ($action == 'getNation')
{
	$sql_string = "";
	
	if (!isset($_GET["q"]))
	{
		//$sql_string = 'SELECT nation,count(*) as count FROM professor_info GROUP BY nation ';
		echo '{"error":"q must be specified."}';
		exit();
	}
	else
	{
		$letter_in_nation = $_GET["q"];
		$sql_string = 'SELECT nation,count(*) as count FROM professor_info WHERE nation like "%'.$letter_in_nation.'%" GROUP BY nation ORDER BY `count` DESC';
	}
	
	$results = $conn -> query($sql_string);
	while ($row = mysqli_fetch_array($results))
	{
		$temp_dict = array();
		$temp_dict["nation"] = $row['nation'];
		$temp_dict["count"] = $row['count'];
		array_push($data_array, $temp_dict);
	}
	if (count($data_array)>6)
	{
		$data_array = array_slice($data_array,0,6);
	}
	
	echo json_encode($data_array);
	
}
?>