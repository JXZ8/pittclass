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




if ($action == "getNumber")
{
	$q = "";
	
	if (isset($_GET["major"]))
	{
		$major_get = $_GET["major"]; //major string got from url

		$major_arr = array(); //store major strings

		if (gettype($major_get)=="string")
		{
			$major_arr[0] = $major_get;
		}
		else{
			$major_arr = $major_get;
		}

		


		$major_sql_string = ""; //set the query critiria
		
		$count = 0;
		//major = 
		foreach($major_arr as $major)
		{
			if ($count == 0)
				$major_sql_string = 'major="'.$major.'" ';
			else
			{
				$major_sql_string = $major_sql_string."OR ";
				$major_sql_string = $major_sql_string.'major="'.$major.'" ';
			} 
			$count++;
		}

		if (isset($_GET["q"]))
		{
			$q = 'course_num like "%'.$_GET["q"].'%"';
			
		}
		$sql = 'SELECT * FROM (SELECT * FROM course_number WHERE '.$major_sql_string.")as t WHERE ".$q; //WHERE major="" or major=""
	}
	else
	{
		if (isset($_GET["q"]))
		{
			$q = 'WHERE course_num like "%'.$_GET["q"].'%"';
		}
		$sql = 'SELECT * FROM course_number '.$q;
		
	}

	$results = $conn -> query($sql);
	while ($row = mysqli_fetch_array($results))
	{
		$temp_dict = array();
		$temp_dict["major_name"] = $row['major'];
		$temp_dict["course_number"] = $row['course_num'];
		$temp_dict["course_name"] = $row['course_name'];
		array_push($data_array, $temp_dict);
	}
	
	if (count($data_array)>6)
	{
		$data_array = array_slice($data_array,0,6);
	}
	

	echo json_encode($data_array);

}
else if ($action == "getName")
{
	$q = "";
	
	if (isset($_GET["major"]))
	{
		$major_get = $_GET["major"]; //major string got from url

		$major_arr = array(); //store major strings

		if (gettype($major_get)=="string")
		{
			$major_arr[0] = $major_get;
		}
		else{
			$major_arr = $major_get;
		}

		


		$major_sql_string = ""; //set the query critiria
		
		$count = 0;
		//major = 
		foreach($major_arr as $major)
		{
			if ($count == 0)
				$major_sql_string = 'major="'.$major.'" ';
			else
			{
				$major_sql_string = $major_sql_string."OR ";
				$major_sql_string = $major_sql_string.'major="'.$major.'" ';
			} 
			$count++;
		}

		if (isset($_GET["q"]))
		{
			$q = ' course_name like "%'.$_GET["q"].'%"';
			
		}
		$sql = 'SELECT * FROM (SELECT * FROM course_number WHERE '.$major_sql_string.")as t WHERE ".$q; //WHERE major="" or major=""
		
	}
	else
	{
		if (isset($_GET["q"]))
		{
			$q = 'WHERE course_name like "%'.$_GET["q"].'%"';
		}
		$sql = 'SELECT * FROM course_number '.$q;
	}

	$results = $conn -> query($sql);
	while ($row = mysqli_fetch_array($results))
	{
		$temp_dict = array();
		$temp_dict["major_name"] = $row['major'];
		$temp_dict["course_number"] = $row['course_num'];
		$temp_dict["course_name"] = $row['course_name'];
		array_push($data_array, $temp_dict);
	}
	
	if (count($data_array)>6)
	{
		$data_array = array_slice($data_array,0,6);
	}
	

	echo json_encode($data_array);

}

?>