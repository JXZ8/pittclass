<?php
header('Content-Type:application/json');
include_once("conn.php");
 


 

$sql = "select * from subject";
$results = $conn -> query($sql);

$total_array = array();

$data_array = array();

while ($row = mysqli_fetch_array($results))
{
	$temp_dict = array();
	$temp_dict["major_name"] = $row['subject_name'];
	$temp_dict["major_index"] = $row['subject_index'];
	array_push($data_array, $temp_dict);
}

$total_array["major"] = $data_array;
echo json_encode($total_array);
//echo json_encode($data_array);
	



?>
