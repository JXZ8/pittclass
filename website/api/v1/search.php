<?php

	include_once("conn.php");
	header('Content-Type:application/json');

	if(!isset($_GET["action"]))
	{
		//header set to 400
		//exit
	}
	
	$total_criteria = 0;
	
	$major = [];
	$course_num = [];
	$course_name = [];
	$course_unit_low = "";
	$course_unit_high = "";
	$class_time_range_low = "";
	$class_time_range_high = "";
	$professor_name = [];
	$professor_nationality = [];
	$professor_rating_range_low ="";
	$professor_rating_range_high = "";
	$professor_difficulty_range_low ="";
	$professor_difficulty_range_high = "";
	$career = [];
	$grading_method = [];
	

	
	if (isset($_GET['major']))
	{
		$major = $_GET['major'];
		$total_criteria++;
	}
	
	if (isset($_GET['cnum']))
	{
		$course_num = $_GET['cnum'];
		$total_criteria++;
	}
	
	if (isset($_GET['cname']))
	{
		$course_name = $_GET['cname'];
		$total_criteria++;
	}
	
	if (isset($_GET['pname']))
	{
		$professor_name = $_GET['pname'];
		$total_criteria++;
	}
	
	if (isset($_GET['pn']))
	{
		$professor_nationality = $_GET['pn'];
		$total_criteria++;
	}
	
	if (isset($_GET['ca']))
	{
		$career = $_GET['ca'];
		$total_criteria++;
	}
	
	if (isset($_GET['gm']))
	{
		$grading_method = $_GET['gm'];
		$total_criteria++;
	}
	
	if (isset($_GET['cul']))
	{
		$course_unit_low = $_GET['cul'];
		$total_criteria++;
	}
	if (isset($_GET['cuh']))
	{
		$course_unit_high = $_GET['cuh'];
		$total_criteria++;
	}
	if (isset($_GET['ctl']))
	{
		$class_time_range_low = $_GET['ctl'];
		$total_criteria++;
	}
	if (isset($_GET['cth']))
	{
		$class_time_range_high = $_GET['cth'];
		$total_criteria++;
	}
	if (isset($_GET['prl']))
	{
		$professor_rating_range_low = $_GET['prl'];
		$total_criteria++;
	}
	if (isset($_GET['prh']))
	{
		$professor_rating_range_high = $_GET['prh'];
		$total_criteria++;
	}	
	if (isset($_GET['pdl']))
	{
		$professor_difficulty_range_low = $_GET['pdl'];
		$total_criteria++;
	}
	if (isset($_GET['pdh']))
	{
		$professor_difficulty_range_high = $_GET['pdh'];
		$total_criteria++;
	}
	//这里要改 不要使用 gettype() 来测试某种类型，因为其返回的字符串在未来的版本中可能需要改变。此外，由于包含了字符串的比较，它的运行也是较慢的。

	//使用 is_* 函数代替
	if (gettype($major)=="string" || gettype($course_num)=="string" || gettype($course_name)=="string" || gettype($professor_name)=="string" || gettype($professor_nationality)=="string" || gettype($career)=="string" || gettype($grading_method)=="string"  )
	{
		header('HTTP/1.1 400 Bad Request');
		exit();
	}
	
	if ($total_criteria == 0)
	{
		header('HTTP/1.1 400 Bad Request');
		exit();
	}
	
	$total_sql_string = "";
	
	
	//Get the courses we need first, and then get all the classes belongs to that courses
	$major_sql_string = "SELECT * FROM `course_info`"; //First level of the query
	if (count($major) > 0)
	{
		$major_sql_string .= " WHERE ";
		for( $i=0 , $num=count($major) ; $i < $num ; $i++ ){
			
			$major_sql_string .= "`course_name` like ";
			$major_sql_string .= '"'.$major[$i].' %"';
			if ($i != $num-1)
			{
				$major_sql_string .= " or ";
			}
		}
	}
	
	$results = $conn -> query($major_sql_string);
	
	$courses_array = array();
	$courses_array_temp = array();
	
	while ($row = mysqli_fetch_array($results,MYSQLI_ASSOC))
	{
		$temp_dict = array();
		$temp_dict['id'] = $row['id'];
		$temp_dict['course_id'] = $row['course_id'];
		$temp_dict['course_name'] = $row['course_name'];
		$temp_dict['course_requirement'] = $row['course_requirement'];
		$temp_dict['course_attribute'] = $row['course_attribute'];
		$temp_dict['course_unit'] = $row['course_unit'];
		$temp_dict['course_component'] = $row['course_component'];
		$temp_dict['course_grading_method'] = $row['course_grading_method'];
		$temp_dict['career'] = $row['career'];
		$temp_dict['description'] = $row['description'];
		$temp_dict['session'] = $row['session'];
		array_push($courses_array, $temp_dict);
	}
	
	
		
	
	
	if (count($course_num) > 0)
	{
		for( $i=0 , $num=count($course_num) ; $i < $num ; $i++ )
		{
			for ( $j=0 , $course_array_num=count($courses_array) ; $j < $course_array_num ; $j++ )
			{
				if (strpos(strtolower($courses_array[$j]["course_name"]), " ".strtolower(trim($course_num[$i]))." ") !== False)
				{
					array_push($courses_array_temp, $courses_array[$j]);
				}
			}
			
		}
	}
	
	if (count($course_name) > 0)
	{
		for( $i=0 , $num=count($course_name) ; $i < $num ; $i++ )
		{
			for ( $j=0 , $course_array_num=count($courses_array) ; $j < $course_array_num ; $j++ )
			{
				if (strpos(strtolower($courses_array[$j]["course_name"]), strtolower(trim($course_name[$i]))) !== False)
				{
					array_push($courses_array_temp, $courses_array[$j]);
				}
			}
			
		}
	}
						

	if (count($course_num) > 0 || count($course_name) > 0)
	{
		$courses_array = $courses_array_temp;
		$courses_array_temp = array();
	}
	
	//print_r($courses_array);
	
	//TODO: WRITE course_unit Filter
	if ($course_unit_low != "")
	{
		
	}
	
	
	//TODO: Write career filter
	
	//TODO: Write grading method filter
	
	
	
	
	$course_id_sql = "";
	if (count($courses_array) > 0)
	{
		$course_id_sql .= " OR ";
		for( $i=0 , $num=count($courses_array) ; $i < $num ; $i++ )
		{
			$course_id = $courses_array[$i]["course_id"];
			$course_id_sql .= "`course_id` like \"%".$course_id.'%"';
			if ($i != $num-1)
			{
				$course_id_sql .= " OR ";
			}
		}
	}
	else
	{
		echo '{"course_count":0, "courses":[]}';
		exit();
	}
	
	$classes_array = array();
	$classes_array_temp = array();
	
	$class_select_sql = "SELECT * FROM `class_info` LEFT JOIN `professor_info` ON class_info.instructor_name = professor_info.instructor_name WHERE 1=2 ".$course_id_sql." ORDER BY `course_name` asc, `class_info`.id";
	$results = $conn -> query($class_select_sql);
	while ($row = mysqli_fetch_array($results,MYSQLI_ASSOC))
	{
		$temp_dict = array();
		$temp_dict['id'] = $row['id'];
		$temp_dict['class_id'] = $row['class_id'];
		$temp_dict['section_id'] = $row['section_id'];
		$temp_dict['datetime'] = $row['datetime'];
		$temp_dict['day'] = $row['day'];
		$temp_dict['time'] = $row['time'];
		$temp_dict['duration'] = $row['duration'];
		$temp_dict['class_position'] = $row['class_position'];
		$temp_dict['instructor_name'] = $row['instructor_name'];
		$temp_dict['class_period'] = $row['class_period'];
		$temp_dict['course_name'] = $row['course_name'];
		$temp_dict['course_id'] = $row['course_id'];
		$temp_dict['is_lec'] = $row['is_lec'];
		$temp_dict['department'] = $row['department'];
		$temp_dict['rmp_link'] = $row['rmp_link'];
		$temp_dict['rmp_rating'] = $row['rmp_rating'];
		$temp_dict['rmp_difficulty'] = $row['rmp_difficulty'];
		$temp_dict['instructor_link'] = $row['instructor_link'];
		$temp_dict['nation'] = $row['nation'];
		array_push($classes_array, $temp_dict);
	}
	
	//echo $class_select_sql;
	//print_r($classes_array);

	
	//print_r($classes_array);
	
	if (count($professor_name) > 0)
	{
		for( $i=0 , $num=count($professor_name) ; $i < $num ; $i++ )
		{
			for ( $j=0 , $course_array_num=count($classes_array) ; $j < $course_array_num ; $j++ )
			{
				if (strpos(strtolower($classes_array[$j]["instructor_name"]), strtolower(trim($professor_name[$i]))) !== False)
				{
					array_push($classes_array_temp, $classes_array[$j]);
				}
			}
		}
		$classes_array = $classes_array_temp;
		$classes_array_temp = array();
	}
	
	if (count($professor_nationality) > 0)
	{
		for( $i=0 , $num=count($professor_nationality) ; $i < $num ; $i++ )
		{
			for ( $j=0 , $course_array_num=count($classes_array) ; $j < $course_array_num ; $j++ )
			{
				if (strpos(strtolower($classes_array[$j]["nation"]), strtolower(trim($professor_nationality[$i]))) !== False)
				{
					array_push($classes_array_temp, $classes_array[$j]);
				}
			}
		}
		$classes_array = $classes_array_temp;
		$classes_array_temp = array();
	}

	
	//TODO: Write time period filter
	
	//TODO: Write professor rating filter
	
	//TODO: Write professor difficulty filter
	
	
	//TODO: Write time period filter
	
	//TODO: Write lecture only filter
	
	if (count($classes_array) == 0)
	{
		echo '{"course_count":0, "courses":[]}';
		exit();
	}
	
	// for ( $i=0 , $num=count($classes_array) ; $i < $num ; $i++ )
	// {
		// print_r($classes_array[$i]);
		// echo "<br>";
		
	// }
	
	
	
	
	//print_r($courses_array_temp);
	//print_r($courses_array);

	$final_data_array = array();
	
	$course_name = $classes_array[0]["course_name"];
	$course_count = 1;
	
	$class_arr_temp = array();
	$courses_arr_temp = array();
	$class_info_dict_temp = array();
	
	$total_class_num = 0;
	for ( $i=0 , $num=count($classes_array) ; $i < $num ; $i++ )
	{
		$class_info_dict_temp = array();
		if ($classes_array[$i]["course_name"] != $course_name)
		{
			$temp_arr = array();
			$course_name_splited = explode(" - ",$course_name);
			$temp_arr['course_num'] = $course_name_splited[0];
			$temp_arr['course_name'] = $course_name_splited[1];
			$temp_arr['class_count'] = count($class_arr_temp);
			
			$temp_arr['class_data'] = $class_arr_temp;
			array_push($courses_arr_temp, $temp_arr);
			$class_arr_temp = array();
			
			$course_count++;
			$course_name = $classes_array[$i]["course_name"];
		}
		
		//If course name is the same, then add to class array
		$class_info_dict_temp['time'] = str_replace(" ","&nbsp;",$classes_array[$i]["time"])." ";
		$class_info_dict_temp['class_duration'] = str_replace(" ","&nbsp;",$classes_array[$i]["duration"]);
		$class_info_dict_temp['isSelect'] = json_decode(str_replace("'","\"",$classes_array[$i]["day"]));
		
		$class_info_dict_temp['course_duration'] = $classes_array[$i]["class_period"];
		$class_info_dict_temp['place'] =str_replace(" ","&nbsp;",$classes_array[$i]["class_position"]); 
		if ($classes_array[$i]["instructor_name"]=="")
		{
			$class_info_dict_temp['professor_name'] = "Not Assigned";
		}
		else{
			$class_info_dict_temp['professor_name'] = $classes_array[$i]["instructor_name"];
		}
		
		
		$class_info_dict_temp['professor_nationality'] = $classes_array[$i]["nation"];
		$class_info_dict_temp['total_rating'] = $classes_array[$i]["rmp_rating"];
		$class_info_dict_temp['difficulty'] = $classes_array[$i]["rmp_difficulty"];
		$class_info_dict_temp['take_again_rate'] = "123%"; //need to be changed
		$class_info_dict_temp['rmp_link'] = $classes_array[$i]["rmp_link"];
		
		if ($classes_array[$i]['is_lec'] == "0")
		{
			$class_info_dict_temp['classType'] = ["isRecitation" => true,"isLecture" => false,"isLab" => false];
		}
		else if ($classes_array[$i]['is_lec'] == "1")
		{
			$class_info_dict_temp['classType'] = ["isRecitation" => false,"isLecture" => true,"isLab" => false];
		}
		else if ($classes_array[$i]['is_lec'] == "2")
		{
			$class_info_dict_temp['classType'] = ["isRecitation" => false,"isLecture" => false,"isLab" => true];
		}
		else
		{
			$class_info_dict_temp['classType'] = ["isRecitation" => false,"isLecture" => false,"isLab" => false];
		}
		
		array_push($class_arr_temp, $class_info_dict_temp);
		$total_class_num++;
	}
	
	if (count($class_arr_temp)>0)
	{
		
		$temp_arr = array();
		$course_name_splited = explode(" - ",$course_name);
		$temp_arr['course_num'] = $course_name_splited[0];
		$temp_arr['course_name'] = $course_name_splited[1];
		$temp_arr['class_count'] = count($class_arr_temp);
		
		$temp_arr['class_data'] = $class_arr_temp;
		
		array_push($courses_arr_temp, $temp_arr);
		$class_arr_temp = array();
		
		$course_count++;
		$course_name = $classes_array[count($classes_array)-1]["course_name"];
	}
	
	$final_data_array["course_count"] = count($courses_arr_temp);
	$final_data_array["total_class_count"] = $total_class_num;
	
	
	$page_num = 0;
	
	//换行 如果没有page的话则默认为第0页
	if (isset($_GET['page']))
	{
		$page_num = intval($_GET['page']);
		if ($page_num<0)
		{
			header('HTTP/1.1 400 Bad Request');
			exit();
		}
	}
	
	define("CLASS_IN_ONE_PAGE", 30);

	
	//只有在总classes超过30个的时候才会动态加载
	//LOW EFFICIENT!!! TODO: CHANGE THE LOGIC
	if ($total_class_num >= CLASS_IN_ONE_PAGE)
	{
		$slice_index_start = -1;
		$slice_index_end = -1;
	
		$temp_class_count = 0;
		
		for ($i = 0, $num = count($courses_arr_temp); $i < $num; $i++)
		{
			$temp_class_count += count($courses_arr_temp[$i]['class_data']);
			//Start
			if ($slice_index_start == -1)
			{
				if ($temp_class_count >= CLASS_IN_ONE_PAGE*$page_num)
				{
					$slice_index_start = $i;
				}
				
			}
				
			
			if ($temp_class_count >= CLASS_IN_ONE_PAGE*($page_num+1))
			{
				$slice_index_end = $i - 1;
				break;
			}
			
			if ($i == $num - 1)
			{
				if ($slice_index_start != -1)
				{
					$slice_index_end = $i;
				}
			}
		}
		//Page too large
		if ($slice_index_start<0)
		{
			$final_data_array["current_class_count"] = 0;
		}
		else
		{
			$final_data_array["current_class_count"] = $temp_class_count - CLASS_IN_ONE_PAGE*$page_num - count($courses_arr_temp[$slice_index_end]['class_data']);
		}
			

		//slice

		$courses_arr_temp = array_slice($courses_arr_temp, $slice_index_start, $slice_index_end - $slice_index_start + 1);
	}
	else
	{
		$final_data_array["current_class_count"] = $total_class_num;
		
		if ($page_num > 0)
		{
			$final_data_array["current_class_count"] = 0;
		}
		
	}
	$final_data_array["courses"] = $courses_arr_temp;
	$final_data_array["current_course_count"] = count($courses_arr_temp);
	

	echo json_encode($final_data_array);
	
	//$final_data_array['course_count'] = count($courses_array);
	



?>