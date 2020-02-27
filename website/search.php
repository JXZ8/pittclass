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
<html>
<head>
	<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>

		<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>

		<link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
  <script src="https://unpkg.com/vue"></script>


	<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	
<link rel="stylesheet" href="css/buefy.min.css"  crossorigin="anonymous">

<script src="js/buefy.min.js" crossorigin="anonymous"></script>
<script src="js/dictionary.js" crossorigin="anonymous"></script>
	

<script
  src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"
  integrity="sha256-xNjb53/rY+WmG+4L6tTl9m6PpqknWZvRt0rO1SRnJzw="
  crossorigin="anonymous"></script>
	
<meta charset="utf-8">
<title>Search Result</title>
	
	<style>
		
		@media screen and (min-width: 1728px){
			.single_result_container{
				width: 1200px;
				white-space: nowrap;
			}
		}
			
		.vertical_center{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		
		b-button{
			color: white;
		}
		
		html,body{
			height: 100%;
			background: #ebebeb;
		}
		.single_result_container{
			min-width: 500px;
			background: white;
			margin-top: 20px;
			border: 1px solid #cccccc;
			overflow: hidden;
			white-space: nowrap;

			-webkit-transition:ease all 0.1s;
			-moz-transition:ease all 0.1s;
			-webkit-transition-delay:0.1s;
			-moz-transition-delay:0.1s;
		}
		.result_table_container{
			height: 100%;
		}
		.class_info{
			padding-top: 15px;
			border-bottom: 1px solid #cccccc;
			padding-bottom: 10px;
		}
		span{
			font-size: 18px;
		}
		strong{
			font-weight: 600;
		}
		a{
			text-decoration: underline;
		}
		.day_indicator{
			list-style: none;
			text-align: center;
			font-size: 18px;
		}
		.day_indicator_single{
			border-radius: 2px;
			float: left;
			width:31px;
			border: 1px solid white;
			border-left: none;
			color: white;
		}
		.left_b{
			border-left: 1px solid white;
		}
		.day_select{
			background: #167df0;
			color: white;
			border: 1px solid grey;
		}
		.professor_info{
			padding-top: 8px;
		}
		.professor_rating_div{
			border-left: 1px solid #cccccc;
		}
		.single_result_container:hover{
			border: 1px solid #337ab7;
			box-shadow:0px 0px 15px 5px #B8B8B8	;
		}
		.buttons{
			overflow: hidden;
		}
		.info{
			border-right: 1px solid #cccccc;
		}
		.single_course_container:not(:first-child){
			margin-top: 50px;
		}
		.shoping_cart_div{
			position: fixed;
			border-radius: 50px;
			width: 70px;
			height: 70px;
			right: 20px;
			bottom: 15%;
			z-index: 1;
			border: 1px solid #7957d5;
			cursor: pointer;
			text-align: center;
			color:#7957d5;
			
			-webkit-transition:ease background 0.1s;
			-moz-transition:ease background 0.1s;
			-webkit-transition-delay:ease background 0.1s;
			-moz-transition-delay:ease background 0.1s;
			
			-webkit-transition:ease width 0.6s;
			-moz-transition:ease width 0.6s;
			-webkit-transition-delay:ease width 0.6s;
			-moz-transition-delay:ease width 0.6s;
		}
		.cart_icon{
			margin-left: -14px;
		}
		.shoping_cart_div:hover{
			background: #7957d5;
			color: white;
			
		}
		.cart_modal_div{
			
		}
		.lecture_indicator{
			position: absolute;
			width: 80px;
			height: 30px;
			margin-left: -50px;
			transform:rotate(-45deg);
			text-align: center;
			
		}
		.lecture_indicator span{
			margin-left: -7px;
			top: 8px;
			position: absolute;
			color: white;
		}
		.is_lecture{
			background: #167df0;
		}
		.is_recitation{
			background: #7957d5;
		}
		.is_lab{
			background: #FFE500;
		}
		.loading{
			
		}
		.loading_div{
			position: fixed;
			top: 30px;
			right: 30px;
			height: 100px;
			width: 100px;

		}
	</style>
</head>

<body>
	<div class="shoping_cart_div" @click="cartModal();">
			<span id="cart_add_text" class="vertical_center" style="left: 25px;">New Item Added!</span>
			 <b-icon class="vertical_center cart_icon" id="cart_icon" icon="cart" size="is-medium" ></b-icon>
	</div>
	

	
	<div id="nav_bar" >
		<b-navbar :mobile-burger="false" >
			<template slot="brand">
				<b-navbar-item tag="router-link" :to="{ path: '/' }">
					<img
						src="img/search/pitt-logo.png"
						alt="Lightweight UI components for Vue.js based on Bulma"
					>
				</b-navbar-item>
			</template>
			<template slot="start">
				<b-navbar-item href="index.html">
					Home
				</b-navbar-item>
				<b-navbar-item href="">
					New Project
				</b-navbar-item>
				<b-navbar-dropdown label="Developers">
					<b-navbar-item href="#">
						SCI Students
					</b-navbar-item>
					<b-navbar-item href="#">
						APIs
					</b-navbar-item>
				</b-navbar-dropdown>
			</template>

			<template slot="end" >
				<b-navbar-item onClick="openFeedBack();">
					Feedback
				</b-navbar-item>
			</template>
		</b-navbar>
	</div>
	

            
	
	<div class="result_table_container">
			<course-block v-for="course in courses" :course_num="course.course_num" :course_name="course.course_name" :class_list="course.classes" :class_type_style_arr="classTypeStyleArr" :class_type_name_arr="classTypeNameArr">		

			</course-block>



		<!--<div id="single_course_container" class="single_course_container col-md-8 col-md-offset-2 col-sm-10 col-xs-10 col-sm-offset-1 col-xs-offset-1">
			<h1 style="font-size: 35px;">{{course_number}}<span style="font-size: 25px;">{{course_name}}</span></h1>
			<div class="single_result_container col-md-12 col-sm-12 col-xs-12" v-for="classs in classes">
				
				<div class="lecture_indicator" v-bind:class="{  is_recitation:classs.classType.isRecitation, is_lecture:classs.classType.isLecture}"></div>
				
				<div class="info col-md-10 col-sm-10 col-xs-10">
					<div class="class_info">
						<div class="row">
							<div class="col-md-3">
								<strong><span style="font-size: 22px;color: #333;" v-html="classs.time"></span></strong><span v-html="classs.class_duration" style="font-size: 15px;"></span>
							</div>

							<div class="col-md-4 col-md-offset-1">
								<div class="day_indicator">
									<li class="day_indicator_single left_b" v-bind:class="{ day_select:classs.isSelect.mon }">Mo</li>
									<li class="day_indicator_single " v-bind:class="{ day_select:classs.isSelect.tue }">Tu</li>
									<li class="day_indicator_single " v-bind:class="{ day_select:classs.isSelect.wed }">We</li>
									<li class="day_indicator_single " v-bind:class="{ day_select:classs.isSelect.thu }">Th</li>
									<li class="day_indicator_single " v-bind:class="{ day_select:classs.isSelect.fri }">Fr</li>
								</div>
							</div>

							<div class="col-md-4">
								<span>{{classs.course_duration}}</span>
							</div>
						</div>
						<div class="row " style="margin-top: 5px;">
							<div class="col-md-3" v-html="classs.place">
								
							</div>

						</div>


					</div>

					<div class="professor_info">
						<div class="col-md-4">
							<div class="row">
								<div class="col-md-12">
									<strong><span><a :href="getRmpLink()">{{classs.professor_name}}</a></span></strong>
								</div>

							</div>

							<div class="row">
								<div class="col-md-12">
									<span class="">{{classs.professor_nationality}}</span>
								</div>



							</div>
						</div>
						<div class="col-md-8">
							<div class="col-md-12 row professor_rating_div">
								<span class="">Total Rating: {{classs.total_rating}}</span>
								<span style="margin-left: 30px;margin-right: 30px;">Difficulty: {{classs.difficulty}}</span>
								<span style="">Take&nbsp;again:&nbsp;{{classs.take_again_rate}}</span>
							</div>

							<div class="col-md-12 row professor_rating_div">

							</div>
							<span style="float: right;font-size: 13px;color: #C0C0C0;">
								From Ratemyprofessors.com
							</span>
						</div>
					</div>
				</div>

				<div class="buttons col-md-2" >
					<div class="col-md-12 " style="padding-top:30px;">
						<div style="width:100%;">
							<b-button type="is-link" @click="addToCartNotify" icon-right="plus" style="margin-top:10px;margin-bottom:10px;float:none;" class="row" outlined>Add</b-button>
						</div>
						<b-button type="is-info"  icon-right="arrow-right" class="row"  style="float:none;" outlined>Details</b-button>
					</div>


				</div>

				</div>

		</div>-->
	
		

		
		
		<!--<div class="single_course_container col-md-8 col-md-offset-2 col-sm-10 col-xs-10 col-sm-offset-1 col-xs-offset-1">
			<h1 style="font-size: 35px;">CS 0401 <span style="font-size: 25px;">Intermediate programming with java</span></h1>
			<div class="single_result_container col-md-12 col-sm-12 col-xs-12" style="overflow: hidden;">
				
				<div class="lecture_indicator is_lecture"></div>
				
				<div class="info col-md-10 col-sm-10 col-xs-10">
					<div class="class_info">
						<div class="row">
							<div class="col-md-3">
								<strong><span style="font-size: 22px;color: #333;">16:00 - 17:15</span> </strong>1h&nbsp;15min
							</div>

							<div class="col-md-4 col-md-offset-1">
								<div class="day_indicator">
									<li class="day_indicator_single left_b">Mo</li>
									<li class="day_indicator_single day_select">Tu</li>
									<li class="day_indicator_single ">We</li>
									<li class="day_indicator_single day_select">Th</li>
									<li class="day_indicator_single ">Fr</li>
								</div>
							</div>

							<div class="col-md-4">
								<span>2019/04/01 - 2019/04/25</span>
							</div>
						</div>
						<div class="row " style="margin-top: 5px;">
							<div class="col-md-3">
								G8&nbsp;Cathedral&nbsp;of&nbsp;Learning
							</div>

						</div>


					</div>

					<div class="professor_info">
						<div class="col-md-4">
							<div class="row">
								<div class="col-md-12">
									<strong><span><a href="#">Jingxuan Zhang</a></span></strong>
								</div>

							</div>

							<div class="row">
								<div class="col-md-12">
									<span class="">China</span>
								</div>



							</div>
						</div>
						<div class="col-md-8">
							<div class="col-md-12 row professor_rating_div">
								<span class="">Total Rating: 4.9</span>
								<span style="margin-left: 30px;margin-right: 30px;">Difficulty: 2.5</span>
								<span style="">Take&nbsp;again:&nbsp;57%</span>
							</div>

							<div class="col-md-12 row professor_rating_div">

							</div>
							<span style="float: right;font-size: 13px;color: #C0C0C0;">
								From Ratemyprofessors.com
							</span>
						</div>
					</div>
				</div>

				<div class="buttons col-md-2" >
					<div class="col-md-12 " style="padding-top:30px;">
						<div style="width:100%;">
							<b-button type="is-link" @click="addToCartNotify" icon-right="plus" style="margin-top:10px;margin-bottom:10px;float:none;" class="row" outlined>Add</b-button>
						</div>
						<b-button type="is-info"  icon-right="arrow-right" class="row"  style="float:none;" outlined>Details</b-button>
					</div>


				</div>

				</div>

		</div>-->
		<div class="loading_div">
			<b-loading :is-full-page="isLoadingFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
		</div>

	</div>
	
	


	<script>
		const SEARCH_API_PATH = "http://127.0.0.1/api/v2/search";
		

		
		
		function getUrlParamPart()
		{
			var paramPart = window.location.href.slice(window.location.href.indexOf('?') + 1);
			return paramPart;
		}
		
		//vue app for nav bar
		var navBarApp = new Vue({
			el: "#nav_bar"
		});
		
		//course block component
		Vue.component('course-block', {
			props: ['course_num', 'course_name', 'class_list', 'class_type_name_arr', 'class_type_style_arr'],
			template: '	<div class="single_course_container col-md-8 col-md-offset-2 col-sm-10 col-xs-10 col-sm-offset-1 col-xs-offset-1"><h1 style="font-size: 35px;">{{course_num}} <span style="font-size: 25px;">{{course_name}}</span></h1><class-block v-for="c in class_list" :time="c.time" :duration="c.duration" :period="c.period" :place="c.place" :instructor_name="c.instructor_name" :nation="c.nation" :rating="c.rating" :difficulty="c.difficulty" :take_again="c.take_again" :day_array="c.day" :type="c.classType" :class_type_name_arr="class_type_name_arr" :class_type_style_arr="class_type_style_arr" :rmp_link="c.rmp_link"></class-block></div>',

		})

		//class info component
		Vue.component('class-block', {
			props: ['time', 'duration', 'place', 'period', 'instructor_name', 'nation', 'rating', 'difficulty', 'take_again', 'day_array', 'type', 'class_type_name_arr', 'class_type_style_arr', 'rmp_link'],
			template: '<div class="single_result_container col-md-12 col-sm-12 col-xs-12" style="overflow: hidden;"><div class="lecture_indicator" :class="class_type_style_arr[type]"><span>{{class_type_name_arr[type]}}</span></div><div class="info col-md-10 col-sm-10 col-xs-10"><div class="class_info"><div class="row"><div class="col-md-3"><strong><span style="font-size: 22px;color: #333;">{{time}}</span> </strong>{{duration}}</div><div class="col-md-4 col-md-offset-1"><div class="day_indicator"><li class="day_indicator_single left_b" :class="{ day_select:day_array[0] }">Mo</li><li class="day_indicator_single" :class="{ day_select:day_array[1] }">Tu</li><li class="day_indicator_single" :class="{ day_select:day_array[2] }">We</li><li class="day_indicator_single" :class="{ day_select:day_array[3] }">Th</li><li class="day_indicator_single " :class="{ day_select:day_array[4] }">Fr</li></div></div><div class="col-md-4"><span>{{period}}</span></div></div><div class="row " style="margin-top: 5px;"><div class="col-md-3">{{place}}</div></div></div><div class="professor_info"><div class="col-md-4"><div class="row"><div class="col-md-12"><strong><span><a :href="rmp_link">{{instructor_name}}</a></span></strong></div></div><div class="row"><div class="col-md-12"><span class="">{{nation}}</span></div></div></div><div class="col-md-8"><div class="col-md-12 row professor_rating_div"><span class="">Total Rating: {{rating}}</span><span style="margin-left: 30px;margin-right: 30px;">Difficulty:&nbsp;{{difficulty}}</span><span style="">Take&nbsp;again:&nbsp;{{take_again}}</span></div><div class="col-md-12 row professor_rating_div"></div><span style="float: right;font-size: 13px;color: #C0C0C0;">From Ratemyprofessors.com</span></div></div></div><div class="buttons col-md-2" style="padding-top:10px;"><div class="col-md-12 " style=""><div style="width:100%;"><b-button type="is-link" @click="addToCartNotify" icon-right="plus" style="margin-top:10px;margin-bottom:10px;float:none;" class="row" outlined>Add</b-button></div><b-button type="is-info" icon-right="arrow-right" class="row" style="float:none;" outlined>Details</b-button></div></div></div>'
		})
		

		
		//vue app for page
		var courseApp = new Vue({
			el: ".result_table_container",
			data: {
					lastPage: 0,
					totalClassCount: 0,
					currentClassCount: 0,
					courses:[],
					currentPage: 0,
					updatedFlag: true,
					isLoading: false,
					isLoadingFullPage: true,
					classTypeNameArr: ["REC", "LEC", "LAB"],
					classTypeStyleArr: ["is_recitation", "is_lecture", "is_lab"],

			},
			mounted: function(){
				this.updateCourseData(this.currentPage++);
				this.addScrollBottomListener();
			},
			computed: {
				/*
				isLoading: function () {
					return !this.updatedFlag;
				}
				*/
			},
			watch: {
				updatedFlag: function(val){
					this.isLoading = !val;
				},
				isLoading: function(val)
				{
					//if is loading == false but updatedFlag == false
					//means the user cancel the loading icon. then continue on the bottom of the page
					if (val == false && this.updatedFlag == false)
					{
						this.isLoadingFullPage = false;
						this.isLoading = true;
					}
					else if (val == false && this.updatedFlag == true)
					{
						this.isLoadingFullPage = true;
					}
				}
			},
			
			methods: {
				addScrollBottomListener: function()
				{
					window.onscroll = () => {
					   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
							if (this.updatedFlag && this.currentPage <= this.lastPage)
								this.updateCourseData(this.currentPage++);
					   }
					}
				},
				//get course info from server api and add to data
				updateCourseData: function(page)
				{
					this.updatedFlag = false;
					axios
					.get(SEARCH_API_PATH+'?page='+page+"&"+getUrlParamPart(), {timeout: 10000})
					.then(response=>{
							//add course data
							response.data.data.courses.forEach((val, index)=>{
									/*
									//convert class type to what we defined in vue
									val.classes.forEach((val, index) =>{
										
									})
									*/
								
									//time complexity is bad but I won't imporve it
									//if course already exist, then merge it into the existing course block
									var pushCourse = true;
									this.courses.forEach((valThis, indexThis)=>{
										
										if (valThis.course_name.localeCompare(val.course_name) == 0){
											this.courses[indexThis].classes = this.courses[indexThis].classes.concat(val.classes);
											//console.log(this.courses[indexThis]);
											pushCourse = false;
										}
									})
									//otherwise create a new course block
									if (pushCourse)
										this.courses.push(val);
								}
							)
							//update last page
							this.lastPage = response.data.last_page;
							//update total class count
							this.totalClassCount = response.data.total_class_count;
							
							//prompt
							var currentLastClass = this.currentClassCount + response.data.data.class_count;

							this.$buefy.toast.open({
								 message: 'Browsing classes: ' + this.currentClassCount + ' - ' + currentLastClass + '. Total: ' + this.totalClassCount,
								 type: 'is-success',
								 queue: false,
								 duration: 1500
							});
						
							//update current class count
							this.currentClassCount = currentLastClass;
						
							//update professor data
							this.professorDataExpired = true;
						})
					.catch((error)=> {
						this.$buefy.toast.open({
							 message: "Update classes data failed. "+error,
							 type: 'is-danger',
							 queue: false,
							 duration: 2000
						 });
					})
					.then(()=>{
						this.updatedFlag = true;
					});
					
					
				}
			}
		})
		
		
	</script>
</body>
</html>