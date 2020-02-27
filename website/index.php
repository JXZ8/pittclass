<?php
/*
	require_once("api/v1/conn.php");
	if (!isset($_COOKIE['activation_code']) )
	{
		header("Location: activate.php"); 
		exit();
	}
	
	$activation_code = $_COOKIE['activation_code'];

	$stmt = $conn->prepare('SELECT * FROM activation_code WHERE activation_code = ?');
	$stmt->bind_param('s',  $activation_code );
	$stmt->execute();

	$result = $stmt->get_result();
	$count =  mysqli_num_rows($result );

	if ($count == 0)
	{
		header("Location: activate.php"); 
		exit();
	}
	*/

?>

<!doctype html>
<html><head>

	<link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
  <script src="https://unpkg.com/vue"></script>

	
	<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
	<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	
<link rel="stylesheet" href="css/buefy.min.css"  crossorigin="anonymous">

<script src="js/buefy.min.js" crossorigin="anonymous"></script>
<script src="js/dictionary.js" crossorigin="anonymous"></script>
	
	
<meta charset="utf-8">
	

	
<title>Class Search</title>

<style>
	h1{
		font-size: 36px;
	}
	
	html, body{
		height: 100%;
		width: 100%;
	}
	
	body {
		background: url('img/index/background.png') no-repeat center center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		background-size: cover;
		-o-background-size: cover;
	}
	
	.vertical_center{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.search_area_container {
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.search_form_container {
		border-radius: 3px;
		background-color: white;
		height: 100px;
	}
	
	.caption_container{
		color: white;
		margin-bottom: 20px;
	}
	
	.submit_button{
		margin-left: 1.5%;
		float: right;
		background: #72b9e8;
		
		-webkit-transition:ease background 0.1s;
		-moz-transition:ease background 0.1s;
		-webkit-transition-delay:ease background 0.1s;
		-moz-transition-delay:ease background 0.1s;
		
		background-image: -webkit-linear-gradient(top, #72b9e8, #3fe3e3);
		background-image: -moz-linear-gradient(top, #72b9e8, #3fe3e3);
		background-image: -ms-linear-gradient(top, #72b9e8, #3fe3e3);
		background-image: -o-linear-gradient(top, #72b9e8, #3fe3e3);
		background: #7957d5;
		
		-webkit-border-radius: 3;
		-moz-border-radius: 3;
		border-radius: 3px;
		font-family: Arial;
		color: #ffffff;
		font-size: 20px;
		padding: 10px 20px 10px 20px;
		text-decoration: none;
		border: 0px;
	}
	
	.submit_button:hover {
		
		/*
		background-image: -webkit-linear-gradient(top, #3fe3e3, #72b9e8);
		background-image: -moz-linear-gradient(top, #3fe3e3, #72b9e8);
		background-image: -ms-linear-gradient(top, #3fe3e3, #72b9e8);
		background-image: -o-linear-gradient(top, #3fe3e3, #72b9e8);
		background-image: linear-gradient(to bottom, #3fe3e3, #72b9e8);
		*/
		border: 1px solid grey;
}
	
	.more_criteria_container{
		background: ;
		height: 400px;
		margin-top: 30px;
	}
	
	.criteria_button_container{
		height: 100px;
	}
	
	.criteria_button{
		border: 1px solid white;
		background: none;
		color: white;
		font-size: 19px;
		border-radius: 23px;
		margin-left: 10px;
		transition: all ease-out .1s;
		margin-top: 15px;
	}
	
	.criteria_button:hover{
		background: white;
		color: black;
	}
	
	.criteria_single_button_container{
		height: 100%;
	}
	
	.input_form_div{
		margin-top: 20px;
		float: left; 
	}
	
	.input_form{
		float: left; 
		height: 48px;
		font-size: 20px;
		width: 100%;

	}
	
	.input-group-addon:hover{
		cursor: pointer;
	}
	
	.input-group-addon{
		margin-left: 200px;
	}
	.hidden{
		display: none;
	}

	#major{
		background: white;
		color: black;
	}

</style>
</head>

<body>
	
	<div class="search_area_container">
		
		<div class="caption_container">
			<h1 style="color: white; font-weight: 700; font-size: " class="text-center">Search Classes &amp; Enrollment <small style="color:white;">Alpha Version</small></h1>
			<div style="height: 15px;"></div>
			<h4 style="color: white; " class="text-center">"Think Different"</h4>
		</div>
		<div id="app">
			
		<div class="search_form_container col-md-6 col-md-offset-3">
			<form onsubmit="return false" >
			  <div class="col-md-10 col-md-offset-0 vertical_center" id="search_input_div">
				  
				  <div class="criteria_input_group">
					<div class="input-group" v-bind:class="{hidden:is_major_hidden}" style="width:100%;float: left;" id="major_input"><section><b-taginput :allow-new="notAllowNew" v-model="major_input_data" size="is-medium" :data="filteredMajorTags" autocomplete field="major_index"  placeholder="Enter Your Major" @typing="getMajorFilteredTags" class="input_form" @input="on_major_tag_change"   autofocus><template slot-scope="props"><strong>{{props.option.major_index}}</strong> - {{props.option.major_name}}</template><template slot="empty">No Majors Founded</template></b-taginput></section> </div>
					  
					  <div class="input-group" v-bind:class="{hidden:is_course_number_hidden}" style="width:100%;float: left;margin-top: 20px;" id="course_number_input"><section><b-taginput :allow-new="notAllowNew" v-model="course_number_input_data" size="is-medium" :data="filteredCourseNumTags" autocomplete field="course_number"  placeholder="Enter Your Course Number" @typing="getCourseNumFilteredTags" class="input_form" @input=""><template slot-scope="props"><strong>{{props.option.major_name}} {{props.option.course_number}}</strong> - {{props.option.course_name}}</template><template slot="empty">No prompts Founded. Click "Enter" to add</template></b-taginput></section> </div>
					  
					  <div class="input-group" v-bind:class="{hidden:is_course_name_hidden}" style="width:100%;float: left;margin-top: 20px;" id="course_name_input"><section><b-taginput :allow-new="notAllowNew" v-model="course_name_input_data" size="is-medium" :data="filteredCourseNameTags" autocomplete field="corse_name_trim"  placeholder="Enter Your Course Name" @typing="getCourseNameFilteredTags" class="input_form" @input=""><template slot-scope="props"><strong>{{props.option.course_name}}</strong> - {{props.option.major_name}} {{props.option.course_number}}</template><template slot="empty">No Courses Founded</template></b-taginput></section> </div>
					  
					  <div class="input-group"  v-bind:class="{hidden:is_course_unit_hidden}" style="width:100%;float: left;margin-top: 20px;" id="course_unit_input"><section><b-field label="Course Unit Range" ><b-slider v-model="course_unit_input_data" :min="0" :max="6" :step="1" type="is-primary" ticks></b-slider></b-field></section></div>
					  
					  <div class="input-group"  v-bind:class="{hidden:is_time_period_hidden}"  style="width:100%;float: left;margin-top:20px;" id="time_period_input"> <section> <b-field label="Class Time Range"> <b-slider :min="7" :max="24" v-model="time_period_input_data" :tooltip="false"> <b-slider-tick :value="7">07:00</b-slider-tick> <b-slider-tick :value="8">08:00</b-slider-tick> <b-slider-tick :value="9">09:00</b-slider-tick> <b-slider-tick :value="10">10:00</b-slider-tick> <b-slider-tick :value="11">11:00</b-slider-tick> <b-slider-tick :value="12">12:00</b-slider-tick> <b-slider-tick :value="13">13:00</b-slider-tick> <b-slider-tick :value="14">14:00</b-slider-tick> <b-slider-tick :value="15">15:00</b-slider-tick> <b-slider-tick :value="16">16:00</b-slider-tick> <b-slider-tick :value="17">17:00</b-slider-tick> <b-slider-tick :value="18">18:00</b-slider-tick> <b-slider-tick :value="19">19:00</b-slider-tick> <b-slider-tick :value="20">20:00</b-slider-tick> <b-slider-tick :value="21">21:00</b-slider-tick> <b-slider-tick :value="22">22:00</b-slider-tick> <b-slider-tick :value="23">23:00</b-slider-tick> <b-slider-tick :value="24">24:00</b-slider-tick> </b-slider> </b-field> </section> </div>
					  
					  <div class="input-group"  v-bind:class="{hidden:is_professor_name_hidden}"  style="width:100%;float: left;margin-top: 20px;" id="professor_name_input"><section><b-taginput :allow-new="allowNew" v-model="professor_name_input_data" size="is-medium" :data="filteredProfessorNameTags" autocomplete field="professor_name"  placeholder="Enter The Professor's name" @typing="getProfessorNameFilteredTags" class="input_form" @input=""><template slot-scope="props"><strong>{{props.option.professor_name}}</strong> -  {{props.option.department}}</template><template slot="empty">No prompts Founded. Click "Enter" to add</template></b-taginput></section> </div>
					  
					  <div class="input-group"  v-bind:class="{hidden:is_professor_nationality_hidden}" style="width:100%;float: left;margin-top: 20px;" id="professor_nationality_input"><section><b-taginput :allow-new="notAllowNew" v-model="professor_nationality_input_data" size="is-medium" :data="filteredProfessorNationalityTags" autocomplete field="nation"  placeholder="Enter Professor Nationality" @typing="getProfessorNationalityFilteredTags" class="input_form" @input=""><template slot-scope="props"><strong>{{props.option.nation}}</strong> - ({{props.option.count}} professors found)</template><template slot="empty">No professors in such country</template></b-taginput></section> </div>
					  
					  <div class="input-group" v-bind:class="{hidden:is_professor_rating_hidden}" style="width:100%;float: left;margin-top: 20px;" id="professor_rating_input"><section><b-field label="Professor Rating Range" ><b-slider v-model="professor_rating_input_data" :min="0" :max="5" :step="1" type="is-info" ticks></b-slider></b-field></section></div>
					  
					  <div class="input-group" v-bind:class="{hidden:is_professor_difficulty_hidden}" style="width:100%;float: left;margin-top: 20px;" id="professor_difficulty_input"><section><b-field label="Professor Difficulty Range" ><b-slider v-model="professor_difficulty_input_data" :min="0" :max="5" :step="1" type="is-danger" ticks></b-slider></b-field></section></div>
					  
					  <div class="input-group" v-bind:class="{hidden:is_career_hidden}" style="width:100%;float: left;margin-top: 20px;" id="career_input"><section><div class="block"><b-checkbox v-model="career_input_data" native-value="undergraduate">Undergraduate</b-checkbox><b-checkbox v-model="career_input_data" native-value="graduate">Graduate</b-checkbox></div></section></div>
					  
					  <div class="input-group" v-bind:class="{hidden:is_grading_method_hidden}" style="width:100%;float: left;margin-top: 20px;" id="grading_method_input"><section><div class="block"><b-checkbox v-model="grading_method_input_data" native-value="lettergrade">Letter Grade</b-checkbox><b-checkbox v-model="grading_method_input_data" native-value="snc">S/NC</b-checkbox><b-checkbox v-model="grading_method_input_data" native-value="hsu">H/S/U</b-checkbox></div></section></div>
					  
					  <div class="input-group" v-bind:class="{hidden:is_lecture_only_hidden}" style="width:100%;float: left;margin-top: 15px;" id="lecture_only_input"><section><div class="block"><b-checkbox-button v-model="lecture_only_input_data" native-value="lectureonly" type="is-success"><b-icon icon="check"></b-icon><span>Lectures Only</span></b-checkbox-button></div></section></div>
					  
				<!--<div class="input-group" style="width:100%;float: left;">
					
					
    					<section>
         					<b-taginput v-model="major_input_data" :data="filteredMajorTags" autocomplete field="major_index"  placeholder="Enter Your Major" @typing="getMajorFilteredTags" class="input_form" size="is-medium" >
								<template slot-scope="props">
									<strong>{{props.option.major_index}}</strong> - {{props.option.major_name}}
								</template>
								<template slot="empty">
									Nothing found
								</template>
            				</b-taginput>
    					</section>
					
					
				 </div>-->
					  
					  
					  
					  
					  
					  
				<!--<div class="input-group" style="width:100%;float: left;">
					
    					<section>
							<div class="block">
								<b-checkbox v-model="checkboxGroup"
									native-value="undergraduate">
									Undergraduate
								</b-checkbox>
								<b-checkbox v-model="checkboxGroup"
									native-value="graduate">
									Graduate
								</b-checkbox>
							</div>
    					</section>
					
				 </div>-->
					  
					  
					  
					  
 
					  
				<!--<div class="input-group" style="width:100%;float: left;"><section><b-taginput v-model="tags" :data="filteredTags" autocomplete field="user.first_name"  placeholder="Enter Your Major" @typing="getFilteredTags" class="input_form"><template slot-scope="props"><strong>{{props.option.id}}</strong>: {{props.option.user.first_name}}</template><template slot="empty">There are no items</template></b-taginput></section><span class="input-group-addon" onClick="remove_input(this)"><i class="glyphicon glyphicon-remove"> </i></span> </div>-->
					  
				  </div>
				  
				  
				<input type="submit"  class="vertical_center submit_button col-md-2" id="submit_button" onClick="search()" value="Search">
					
			  </div>
				
			</form>
		</div>
		</div>
		
		

		
		<div class="more_criteria_container col-md-6 col-md-offset-3" style="z-index: -9999;">
			<h1 style="color: white;">Add Criteria</h1>
			<div class="row criteria_button_container ">
				<a class="criteria_button btn" id="major">Major </a>
				<a class="criteria_button btn" id="course_number">Course Number</a>
				<a class="criteria_button btn" id="course_name">Course Name </a>
				<a class="criteria_button btn" id="course_unit">Course Unit </a>
				<a class="criteria_button btn" id="time_period">Time Period </a>
				<br>

				<a class="criteria_button btn" id="professor_name">Professor Name </a>
				<a class="criteria_button btn" id="professor_nationality">Professor Nationality </a>
				<a class="criteria_button btn" id="professor_rating">Professor Rating </a>
				<a class="criteria_button btn" id="professor_difficulty">Professor Difficulty </a>
				<br>

				<!--<a class="criteria_button btn" id="requirement">Requirement </a>-->
				<a class="criteria_button btn" id="career">Career </a>
				<a class="criteria_button btn" id="grading_method">Grading Method </a>
				<br>
				
				<a class="criteria_button btn" id="lecture_only">Show Lectures Only</a>
				
			</div>
			

			
		</div>

		
	</div>
	<script>
		
		var isShownDict = {};

		var placeHolderDict = {};
		var filterFunctionNameDict = {};
		var filteredTagName = {};
		var autocompleteFieldDict = {};
		var strongLineDict = {};
		var nothingPromptDict = {};
		var userInputDataDict = {};
		var heightNeededDict = {}; //The height that need to be add after appending the element
		var inputFunctionNameDict = {}; //The function will be triggered when tag added/removed
		
		
		isShownDict['major'] = true;
		isShownDict['course_number'] = false;
		isShownDict['course_name'] = false;
		isShownDict['professor_name'] = false;
		isShownDict['professor_rating'] = false;
		isShownDict['professor_difficulty'] = false;
		isShownDict['course_unit'] = false;
		isShownDict['requirement'] = false;
		isShownDict['career'] = false;
		isShownDict['grading_method'] = false;
		isShownDict['time_period'] = false;
		isShownDict['lecture_only'] = false;
		isShownDict['professor_nationality'] = false;
		
		
		
		placeHolderDict['major'] = 'Enter Your Major';
		placeHolderDict['course_number'] = 'Enter Your Course Number';
		placeHolderDict['course_name'] = 'Enter Your Course Name';
		placeHolderDict['professor_name'] = 'Enter The Professor\'s name';
		placeHolderDict['professor_rating'] = 'Professor Rating Range';
		placeHolderDict['professor_nationality'] = 'Enter Professor Nationality';
		placeHolderDict['professor_difficulty'] = 'Professor Difficulty Range';
		placeHolderDict['course_unit'] = 'Course Unit Range';
		placeHolderDict['requirement'] = 'Under Construction';
		placeHolderDict['career'] = '';
		placeHolderDict['grading_method'] = '';
		placeHolderDict['time_period'] = 'Class Time Range';
		
		filterFunctionNameDict['major'] = 'getMajorFilteredTags';
		filterFunctionNameDict['course_number'] = 'getCourseNumFilteredTags';
		filterFunctionNameDict['course_name'] = 'getCourseNameFilteredTags';
		filterFunctionNameDict['professor_name'] = 'getProfessorNameFilteredTags';
		filterFunctionNameDict['professor_nationality'] = 'getProfessorNationalityFilteredTags';
		
		
		
		filteredTagName['major'] = 'filteredMajorTags';
		filteredTagName['course_number'] = 'filteredCourseNumTags';
		filteredTagName['course_name'] = 'filteredCourseNameTags';
		filteredTagName['professor_name'] = 'filteredProfessorNameTags';
		filteredTagName['professor_nationality'] = 'filteredProfessorNationalityTags';
		
		//var courseNumData = [{"major_name":"CS","course_number":"0447", "course_name": "CS COURSE"},{"major_name":"MATH","course_number":"0220", "course_name": "MATH COURSE"},{"major_name":"PHYS","course_number":"0110", "course_name": "PHYS COURSE"}];

		
		autocompleteFieldDict['major'] = 'major_index';
		autocompleteFieldDict['course_number'] = 'course_number';
		autocompleteFieldDict['course_name'] = 'corse_name_trim';
		autocompleteFieldDict['professor_name'] = 'professor_name';
		autocompleteFieldDict['professor_nationality'] = 'nation';
		
		strongLineDict['major'] = '<strong>{{props.option.major_index}}</strong> - {{props.option.major_name}}';
		strongLineDict['course_number'] = '<strong>{{props.option.major_name}} {{props.option.course_number}}</strong> - {{props.option.course_name}}';
		strongLineDict['course_name'] = '<strong>{{props.option.course_name}}</strong> - {{props.option.major_name}} {{props.option.course_number}}';
		strongLineDict['professor_name'] = '<strong>{{props.option.professor_name}}</strong> -  {{props.option.department}}';
		strongLineDict['professor_nationality'] = '<strong>{{props.option.nation}}</strong> - ({{props.option.count}} professors found)';
		
		nothingPromptDict['major'] = 'No Majors Founded';
		nothingPromptDict['course_number'] = 'No prompts Founded. Click "Enter" to add';
		nothingPromptDict['course_name'] = 'No Courses Founded';
		nothingPromptDict['professor_name'] = 'No prompts Founded. Click "Enter" to add';
		nothingPromptDict['professor_nationality'] = 'No professors in such country';
		
		userInputDataDict['major'] = 'major_input_data';
		userInputDataDict['course_number'] = 'course_number_input_data';
		userInputDataDict['course_name'] = 'course_name_input_data';
		userInputDataDict['course_unit'] = 'course_unit_input_data';
		userInputDataDict['time_period'] = 'time_period_input_data';
		userInputDataDict['professor_name'] = 'professor_name_input_data';
		userInputDataDict['professor_nationality'] = 'professor_nationality_input_data';
		userInputDataDict['professor_rating'] = 'professor_rating_input_data';
		userInputDataDict['professor_difficulty'] = 'professor_difficulty_input_data';
		userInputDataDict['career'] = 'career_input_data';
		userInputDataDict['grading_method'] = 'grading_method_input_data';
		userInputDataDict['lecture_only'] = 'lecture_only_input_data';
		//WRITE HERE!!!
		
		/*
		major_input_data: [],
			coursenum_input_data: [],
			coursename_input_data: [],
			courseunit_input_data: [],
			professorname_input_data: [],
			professornation_input_data: [],
			professorrating_input_data: [],
			professordifficulty_input_data: [],
			requirement_input_data: [],
			*/
				
		heightNeededDict['career'] = 40;
		heightNeededDict['grading_method'] = 40;
		heightNeededDict['course_unit'] = 90;
		heightNeededDict['professor_rating'] = 90;
		heightNeededDict['professor_difficulty'] = 90;
		
		inputFunctionNameDict['major'] = 'on_major_tag_change';
		
	const vueApp = {
		data() {
			return {
				filteredMajorTags: [],
				filteredCourseNumTags: [],
				filteredCourseNameTags: [],
				filteredProfessorNameTags: [],
				filteredProfessorNationalityTags: [],
				isSelectOnly: false,
				allowNew: true,
				notAllowNew: false,
				major_input_data: [],
				course_number_input_data: [],
				course_name_input_data: [],
				course_unit_input_data: [],
				time_period_input_data: [],
				professor_name_input_data: [],
				professor_nationality_input_data: [],
				professor_rating_input_data: [],
				professor_difficulty_input_data: [],
				requirement_input_data: [],
				career_input_data: ['undergraduate','graduate'],
				grading_method_input_data: ['lettergrade', 'snc', 'hsu'],
				lecture_only_input_data:['lectureonly'],
				numbers: [0, 5],
				is_major_hidden: false,
				is_course_number_hidden: true,
				is_course_name_hidden: true ,
				is_course_unit_hidden: true,
				is_time_period_hidden: true,
				is_professor_name_hidden: true,
				is_professor_nationality_hidden: true,
				is_professor_rating_hidden: true,
				is_professor_difficulty_hidden: true,
				is_career_hidden: true,
				is_grading_method_hidden: true,
				is_lecture_only_hidden: true
			}
		},
		filters: {
			  trimLongString: function (value) {
				if (!value) return '';
				value = value.toString();
				if (value.length > 15)  
					value = value.substr(0,15);  
				return value;
			  }
			},

		methods: {
			getMajorFilteredTags(text) {
				this.filteredMajorTags = majorData.filter((option) => {
					return (option.major_name.toString().toLowerCase().trim().indexOf(text.toLowerCase()) == 0) || (option.major_index.toString().toLowerCase().trim().indexOf(text.toLowerCase()) == 0)
				})
			},
			 getCourseNumFilteredTags(text) {


				courseNumData = ajaxRequest("/api/v1/courses/?action=getNumber"+major_list_string+"&q="+text);			 

				this.filteredCourseNumTags = courseNumData.filter((option) => {
					return option.course_number.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0 
				})
			}, 
			getCourseNameFilteredTags(text) {

				courseNameData = ajaxRequest("/api/v1/courses/?action=getName"+major_list_string+"&q="+text);			

				for (var courseName in courseNameData)
				{
					if (courseNameData[courseName]['course_name'].length>15)
						courseNameData[courseName]['corse_name_trim'] = courseNameData[courseName]['course_name'].substr(0,15)+"...";
					else
						courseNameData[courseName]['corse_name_trim'] = courseNameData[courseName]['course_name'];
				}

				this.filteredCourseNameTags = courseNameData.filter((option) => {
					return option.course_name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0 
				})
			},
			getProfessorNameFilteredTags(text) {
				professorNameData = ajaxRequest("/api/v1/professors/?action=getName&q="+text);

				this.filteredProfessorNameTags = professorNameData.filter((option) => {
					return option.professor_name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0 
				})
			},
			getProfessorNationalityFilteredTags(text) {
				professorNationalityData = ajaxRequest("/api/v1/professors/?action=getNation&q="+text);

				this.filteredProfessorNationalityTags = professorNationalityData.filter((option) => {
					return option.nation.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0 
				})
			},
			on_major_tag_change(tags_array)
			{

				major_list_string = "";
				for (var tags in tags_array)
				{
					major_list_string += "&";
					major_list_string += "major[]="+tags_array[tags]['major_index'];
				}


				//courseNameData = courseNumData;
			},
			 danger() {
					this.$buefy.toast.open({
						duration: 2000,
						message: `At least one criteria is needed`,
						position: 'is-top',
						type: 'is-danger'
					})
				}
			,
			 avaliablbPrompt() {
					this.$buefy.toast.open({
						duration: 5000,
						message: `Only Major, Course Number, CourseName, Professor Name, Professor Nationality are available now`,
						position: 'is-bottom-left',
						type: 'is-warning'
					})
				}
		}
	}
		
		//("#major_input").css("margin-top","0");
		
		var app = new Vue(vueApp);
		app.$mount(".criteria_input_group");
		
		app.avaliablbPrompt();
		const careerIndentifierData = [{"nativeV":"undergraduate","showV":"Undergraduate"}, {"nativeV":"graduate","showV":"Graduate"}];	//Things inside checkbox
		const gradingMethodIndentifierData = [{"nativeV":"lettergrade","showV":"Letter Grade"}, {"nativeV":"snc","showV":"S/NC"}, {"nativeV":"hsu","showV":"H/S/U"} ];	

			//const data = [{"id":1,"user":{"first_name":"Jesse","last_name":"Simmons"},"date":"2016/10/15 13:43:27","gender":"Male"},{"id":2,"user":{"first_name":"John","last_name":"Jacobs"},"date":"2016/12/15 06:00:53","gender":"Male"},{"id":3,"user":{"first_name":"Tina","last_name":"Gilbert"},"date":"2016/04/26 06:26:28","gender":"Female"}]
		
		//var majorData = [{"major_name":"Computer Science","major_index":"CS"},{"major_name":"Math","major_index":"MATH"},{"major_name":"Music","major_index":"musicini"},{"major_name":"Music","major_index":"music"},{"major_name":"qqqq","major_index":"qqq"}];
		//var courseNumData = [{"major_name":"CS","course_number":"0447", "course_name": "CS COURSE"},{"major_name":"MATH","course_number":"0220", "course_name": "MATH COURSE"},{"major_name":"PHYS","course_number":"0110", "course_name": "PHYS COURSE"}];
		//var courseNameData = [{"major_name":"CS","course_number":"0447", "course_name": "CS COURSE"},{"major_name":"MATH","course_number":"0220", "course_name": "MATH COURSE"},{"major_name":"PHYS","course_number":"0110", "course_name": "PHYS COURSE"}];
		//var professorNameData = [{"professor_name":"jingxuan Zhang","department":"Computer Science"},{"professor_name":"test1","department":"Math"},{"professor_name":"test2","department":"Physic"}];
		
		
		var majorData = ajaxRequest("/api/v1/majors")["major"];
		var courseNumData = [];
		var courseNameData = [];
		var professorNameData = [];
		var professorNationalityData = [];

		function ajaxRequest(requestUrl, method="GET")
		{
			//TODO: Write a request failed handle function
			var returnValue = "";
			$.ajax(
				{
					url:requestUrl,
					async : false,
					success:function(result){
						returnValue = result;
							},
					type:method
				}
			);
			return returnValue;
		}
		
		
		
		
		
		//var professorNationalityData = [{"nation":"China","count":38},{"nation":"United States","count":45},{"nation":"Italy","count":23}]
		
		var major_list_string = ""; //For courseNumber and courseName Search
		
		
		

		$(".taginput-container").height(43);
		$("input").css("font-size","20px");
		
		
		
		var criteria_count = 1;
		
		function generateTagInput(id, isAllowNew=false)
		{
			/*Generate the tag input.
			
			vars:
				id: The id of the add criteria button that was clicked.
				
			return:
				The original html string of the tag input.
				
			warning:
				Those dictionary below should contain the correct value.
			*/
			var placeHolder = placeHolderDict[id];
			var filterFunctionName = filterFunctionNameDict[id];
			var filteredData = filteredTagName[id];
			var acompleteFieldName = autocompleteFieldDict[id];
			var strongLine = strongLineDict[id];
			var nothingPrompt = nothingPromptDict[id];
			var userInputData = userInputDataDict[id];
			
			if (inputFunctionNameDict[id] == undefined)
				var inputFunctionName = "";
			else
				var inputFunctionName = inputFunctionNameDict[id];
			 
			
			if (isAllowNew)
				isAllowNew = "allowNew";
			else
				isAllowNew = "notAllowNew";

				
			return '<div class="input-group" style="width:100%;float: left;margin-top: 20px;" id="'+id+"_input"+'"><section><b-taginput :allow-new="'+isAllowNew+'" v-model="'+userInputData+'" size="is-medium" :data="'+filteredData+'" autocomplete field="'+acompleteFieldName+'"  placeholder="'+placeHolder+'" @typing="'+filterFunctionName+'" class="input_form" @input="'+inputFunctionName+'"><template slot-scope="props">'+strongLine+'</template><template slot="empty">'+nothingPrompt+'</template></b-taginput></section> </div>';
			/*
			'<div class="input-group" style="width:100%;float: left;margin-top: 15px;"><section><b-taginput v-model="'+userInputData+'" size="is-medium" :data="'+filteredData+'" autocomplete field="'+acompleteFieldName+'"  placeholder="'+placeHolder+'" @typing="'+filterFunctionName+'" class="input_form"><template slot-scope="props">'+strongLine+'</template><template slot="empty">'+nothingPrompt+'</template></b-taginput></section><span class="input-group-addon" onClick="remove_input(this)"><i class="glyphicon glyphicon-remove"> </i></span> </div>';
			*/
		}
		
		function generateSelectBox(id, valueAndShow)
		{
			/*Generate the select box original html string
			
			vars:
				id: The id of the add criteria button that was clicked.
				valueAndShow: type [{"nativeV":"value","showV":"identifier that will be shown"},{},{}] 
							  specify the text to be shown and the value if it is choosen.
							
			return:
				The original html string of the SelectBox.
			*/
			var userInputData = userInputDataDict[id];
			var selectBoxStr = '<div class="input-group" style="width:100%;float: left;margin-top: 20px;" id="'+id+"_input"+'"><section><div class="block">';
			
			for(var i = 0, len = valueAndShow.length; i < len; i++){
				selectBoxStr += '<b-checkbox v-model="'+userInputData+'" native-value="'+valueAndShow[i].nativeV+'">'+valueAndShow[i].showV+'</b-checkbox>';
			}
			
			
			selectBoxStr += '</div></section></div>';
			return selectBoxStr;
		}
		
		function generateSlider(id, label, vModel, min, max, step, color_type = "is-info", is_tick = true)
		{
			/*Generate the slider original html string
			
			var:
				id: The id of the add criteria button that was clicked.
				label: Specify the label of the slider.
				vModel: Specify where the value stores.
				min: Specify the min value of the slider.
				max: Specify the max value of the slider.
				step: Specify how far it take for one move.
				color_type: Specify the color.
				is_tick: Specify if there will be tick shown.
				
			return:
				The original html string of the generateSlider.
			*/
			if (id == "time_period")
				return '<div class="input-group" style="width:100%;float: left;margin-top:20px;" id="time_period_input"> <section> <b-field label="'+label+'"> <b-slider :min="7" :max="24" v-model="timeperiod_input_data" :tooltip="false"> <b-slider-tick :value="7">07:00</b-slider-tick> <b-slider-tick :value="8">08:00</b-slider-tick> <b-slider-tick :value="9">09:00</b-slider-tick> <b-slider-tick :value="10">10:00</b-slider-tick> <b-slider-tick :value="11">11:00</b-slider-tick> <b-slider-tick :value="12">12:00</b-slider-tick> <b-slider-tick :value="13">13:00</b-slider-tick> <b-slider-tick :value="14">14:00</b-slider-tick> <b-slider-tick :value="15">15:00</b-slider-tick> <b-slider-tick :value="16">16:00</b-slider-tick> <b-slider-tick :value="17">17:00</b-slider-tick> <b-slider-tick :value="18">18:00</b-slider-tick> <b-slider-tick :value="19">19:00</b-slider-tick> <b-slider-tick :value="20">20:00</b-slider-tick> <b-slider-tick :value="21">21:00</b-slider-tick> <b-slider-tick :value="22">22:00</b-slider-tick> <b-slider-tick :value="23">23:00</b-slider-tick> <b-slider-tick :value="24">24:00</b-slider-tick> </b-slider> </b-field> </section> </div>';
			
			
			var tickStr = "";
			if (is_tick)
				tickStr = "ticks";
			
			return '<div class="input-group" style="width:100%;float: left;margin-top: 20px;" id="'+id+"_input"+'"><section><b-field label="'+label+'" ><b-slider v-model="'+vModel+'" :min="'+min+'" :max="'+max+'" :step="'+step+'" type="'+color_type+'" '+tickStr+'></b-slider></b-field></section></div>';
		}
		$(".criteria_button").click(function(){
			
			/*
			var placeHolder = placeHolderDict.get($(this).attr('id'));
			var filterFunctionName = filterFunctionNameDict.get($(this).attr('id'));
			var filteredData = filteredTagName.get($(this).attr('id'));
			var acompleteFieldName = autocompleteFieldDict.get($(this).attr('id'));
			var strongLine = strongLineDict.get($(this).attr('id'));
			var nothingPrompt = nothingPromptDict.get($(this).attr('id'));
			var userInputData = userInputDataDict.get($(this).attr('id'));
			*/
			
			
			//var input_str = getTagInput($(this).attr('id'))
			var elementId = $(this).attr('id');
			console.log(elementId);
			
			var heightNeeded;
			
			if (heightNeededDict[elementId] == undefined)
				heightNeeded = 70;
			else
				heightNeeded = heightNeededDict[elementId];
			
			if (!isShownDict[elementId])
			{
				
				
				isShownDict[elementId] = !isShownDict[elementId];
				app['is_'+elementId+'_hidden'] = !isShownDict[elementId];
				
				$(".search_form_container").height($(".search_form_container").height()+heightNeeded);
				criteria_count++;


				$('label').css('text-align','left');

				$('#'+elementId).css('background','white');
				$('#'+elementId).css('color','black');		
				
			}
			else
			{
				if (criteria_count == 1)
				{
					app.danger();
					return;
				}
					
				isShownDict[elementId] = !isShownDict[elementId];
				app['is_'+elementId+'_hidden'] = !isShownDict[elementId];
				
				$(".search_form_container").height($(".search_form_container").height()-heightNeeded);
				criteria_count--;



				$('#'+elementId).css('background','none');
				$('#'+elementId).css('color','white');
				
			}
				
			
			
			if (criteria_count == 1)
				$('.input-group').css("margin-top","0");
			else
				$('.input-group:not(:first)').css("margin-top","20px");
			
			
			
		})
		
		
		
		function appendInput(id)
		{
			var heightNeeded;
			
			if (heightNeededDict[id] == undefined)
				heightNeeded = 70;
			else
				heightNeeded = heightNeededDict[id];
				
			//var input_str = getSelectBox(elementId,careerIndentifierData);
			var input_str = getAppendStr(id);
			console.log(input_str);
			
			$(".criteria_input_group").append(input_str);
			$(".search_form_container").height($(".search_form_container").height()+heightNeeded);
			criteria_count++;
			

			
            //mount_c.$destroy();
			
			//TODO: TURN TO VUE's DOCUMATATION AND REWRITE HERE!!!! 
            //app.$mount('#'+id+'_input');
			$('label').css('text-align','left');
			
			$('#'+id).css('background','white');
			$('#'+id).css('color','black');			
		}
		
		function getUrlString(paramName, paramArr){
			var tempDict = {};
			tempDict[paramName] = paramArr;
			return jQuery.param(tempDict)
		}
		
		function search(){
			var major_string = "";
			var course_number_string = "";
			var course_name_string = "";
			//var course_unit_string = "";
			//var time_period_string = "";
			var professor_name_string = "";
			var professor_nationality_string = "";
			//var professor_rating_string = "";
			//var professor_difficulty_string = "";
			//var career_string = "";
			
			
			
			var tempArr;
			

			
			if (app.major_input_data.length>0)
			{
				tempArr = [];
				for(var i = 0, len = app.major_input_data.length; i < len; i++){
					tempArr.push(app.major_input_data[i]['major_index']);
				}
				major_string = getUrlString('major',tempArr)+"&";
			}
			
			if (app.course_number_input_data.length>0)
			{
				tempArr = [];
				for(var i = 0, len = app.course_number_input_data.length; i < len; i++){
					tempArr.push(app.course_number_input_data[i]['course_number']);
				}
				course_number_string = getUrlString('cnum',tempArr)+"&";
			}
			
			if (app.course_name_input_data.length>0)
			{
				tempArr = [];
				for(var i = 0, len = app.course_name_input_data.length; i < len; i++){
					tempArr.push(app.course_name_input_data[i]['course_name']);
				}
				course_name_string = getUrlString('cname',tempArr)+"&";
			}
			
			if (app.professor_name_input_data.length>0)
			{
				tempArr = [];
				for(var i = 0, len = app.professor_name_input_data.length; i < len; i++){
					tempArr.push(app.professor_name_input_data[i]['professor_name']);
				}
				professor_name_string = getUrlString('pname',tempArr)+"&";
			}	
			
			if (app.professor_nationality_input_data.length>0)
			{
				tempArr = [];
				for(var i = 0, len = app.professor_nationality_input_data.length; i < len; i++){
					tempArr.push(app.professor_nationality_input_data[i]['nation']);
				}
				professor_nationality_string = getUrlString('pn',tempArr)+"&";
			}
			var url = "/search?";
			
			url += major_string + course_number_string + course_name_string + professor_name_string + professor_nationality_string;
			window.location.href = url;


			/*
			console.log(app.course_number_input_data);
			console.log(app.course_name_input_data);
			console.log(app.course_unit_input_data);
			console.log(app.time_period_input_data);
			console.log(app.professor_name_input_data);
			console.log(app.professor_nationality_input_data);
			console.log(app.professor_rating_input_data);
			console.log(app.professor_difficulty_input_data);
			console.log(app.career_input_data);
			console.log(app.grading_method_input_data);
			console.log(app.lecture_only_input_data);
			*/
		}
		function removeInput(id)
		{
			if (criteria_count == 1){
				return;
			}
			
			var heightNeeded;
			
			if (heightNeededDict[id] == undefined)
				heightNeeded = 70;
			else
				heightNeeded = heightNeededDict[id];
			
			
			$('#'+id+'_input').remove();
			$(".search_form_container").height($(".search_form_container").height()-heightNeeded);
			criteria_count--;
			
			if (criteria_count == 1)
			{
				$(".input_form_div").css("margin-top",0);
			}
			
			$('#'+id).css('background','none');
			$('#'+id).css('color','white');
		}
		
		
		function getAppendStr(id)
		{
			/*Generate appropriate html string to append by id.
			
			vars:
				id: The id of the button that is clicked.
				
			return:
				The html string to be appended.
			*/
			
			var htmlStr = "";
			if (id == "career" || id =="grading_method" || id == "lecture_only")
			{
				if (id == "career")
					htmlStr = generateSelectBox(id, careerIndentifierData);
				
				else if (id == "grading_method")
					htmlStr = generateSelectBox(id, gradingMethodIndentifierData);
				
				else if (id == "lecture_only")
					htmlStr = '<div class="input-group" style="width:100%;float: left;margin-top: 15px;" id="'+id+"_input"+'"><section><div class="block"><b-checkbox-button v-model="lectureonly_input_data" native-value="lectureonly" type="is-success"><b-icon icon="check"></b-icon><span>Lectures Only</span></b-checkbox-button></div></section></div>';
			}
			else if (id == "course_unit" || id == "time_period" || id == "professor_rating" || id == "professor_difficulty") //slidebar
			{
				var slidePrompt = placeHolderDict[id];
				if (id == "course_unit")
					htmlStr = generateSlider(id, slidePrompt, 'courseunit_input_data', 0, 6, 1, 'is-primary');
				
				else if (id == "time_period")
					htmlStr = generateSlider(id, slidePrompt, 'timeperiod_input_data', 0, 24, 0.1, 'is-success',false);

					
				
				else if (id == "professor_rating")
					htmlStr = generateSlider(id, slidePrompt, 'professorrating_input_data', 0, 5, 1);
				
				else if (id == "professor_difficulty")
					htmlStr = generateSlider(id, slidePrompt, 'professordifficulty_input_data', 0, 5, 1, 'is-danger');
				
			}
			else if (id == "major" || id == "course_number" || id == "course_name" || id == "professor_name" || id == "professor_nationality" || id == "requirement")
			{
				if (id == "professor_name" || id == "course_number")
					htmlStr = generateTagInput(id, true);
				else
					htmlStr = generateTagInput(id);
				
			}
			return htmlStr;
			
		}
		
		
		
		
		
		function keyLogin(){
		 if (event.keyCode==13)  //回车键的键值为13
		   $("#submit_button").click(); //调用登录按钮的登录事件
		}
		
		
	</script>
</body>
</html>
