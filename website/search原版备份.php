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
		
	</div>
	
	
	<div class="loading" id="loading_div">
			<b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
		</div>

	<script>
		//Rewrite the whole js file later!!!!!!!!!!!
		//Rewrite the whole js file later!!!!!!!!!!!
		//Rewrite the whole js file later!!!!!!!!!!!
		//Rewrite the whole js file later!!!!!!!!!!!
		//Rewrite the whole js file later!!!!!!!!!!!
		//Rewrite the whole js file later!!!!!!!!!!!
		//Rewrite the whole js file later!!!!!!!!!!!

		
		var courseNum = 0;
		var hasMoreData = true;
		
		function appenELementByUrl(requestUrl, loading_instance,sync=false, method="GET")
		{
			if (!hasMoreData)
			{
				return;
			}
			//TODO: Error handler improvement check the error code and show alert
			loading_instance.displayLoading();
			var returnValue = "";
			$.ajax(
				{
					url:requestUrl,
					async : sync,
					timeout:15000,
					success:function(result){
							returnValue = result;
							addElement(returnValue);
							loading_instance.hideLoading();
						},
					error: function(xhr, textStatus, errorThrown){
							alert('Request Failed.');
							loading_instance.hideLoading();
						},
					type:method
				}
			);
			
			return returnValue;
		}
		
		function getUrlComponent()
		{
			return window.location.href.split("?")[1];
		}
		
		
		$("#cart_add_text").hide();
		/*
		const returnDataTest1 = {"course_count":3,courses:[{"course_num":"CS401","course_name":"test", "class_count":2,class_data:
														   [{"time":"16:00&nbsp;-&nbsp;17:15","class_duration":" 1h&nbsp;15min","isSelect":{"mo":true,"tu":true},"course_duration":"2019/04/01 - 2019/04/25","place":"G8&nbsp;Cathedral&nbsp;of&nbsp;Learning","professor_name":"Jingxuan Zhang","professor_nationality":"China","total_rating":"4.9","difficulty":"2.5","take_again_rate":"57%","rmp_link":"http://www.ratemyprofessors.com","classType":{"isRecitation":false,"isLecture":true}},{"time":"22:00&nbsp;-&nbsp;23:15","class_duration":" 1h&nbsp;15min","isSelect":{"we":true,"th":true},"course_duration":"2019/04/01 - 2019/04/25","place":"G8&nbsp;Cathedral&nbsp;of&nbsp;Learning","professor_name":"test name","professor_nationality":"Italy","total_rating":"3.9","difficulty":"2.8","take_again_rate":"67%","rmp_link":"http://www.ratemyprofessors.com","classType":{"isRecitation":false,"isLecture":true}}]
														  },
														  
														  
														  
														  
														  
														  
														  
														  
														  {"course_num":"CS401","course_name":"test", "class_count":2,class_data:[{"time":"16:00&nbsp;-&nbsp;17:15","class_duration":" 1h&nbsp;15min","isSelect":{"mo":true,"tu":true},"course_duration":"2019/04/01 - 2019/04/25","place":"G8&nbsp;Cathedral&nbsp;of&nbsp;Learning","professor_name":"Jingxuan Zhang","professor_nationality":"China","total_rating":"4.9","difficulty":"2.5","take_again_rate":"57%","rmp_link":"http://www.ratemyprofessors.com","classType":{"isRecitation":false,"isLecture":true}},{"time":"22:00&nbsp;-&nbsp;23:15","class_duration":" 1h&nbsp;15min","isSelect":{"we":true,"th":true},"course_duration":"2019/04/01 - 2019/04/25","place":"G8&nbsp;Cathedral&nbsp;of&nbsp;Learning","professor_name":"test name","professor_nationality":"Italy","total_rating":"3.9","difficulty":"2.8","take_again_rate":"67%","rmp_link":"http://www.ratemyprofessors.com","classType":{"isRecitation":false,"isLecture":false,"isLab":true}}]}]};
		*/
		
		
		//Content of shopping cart modal
		const shoppingCartModel = {
		
        template: `
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Shopping Cart Under Construction</p>
                    </header>
                    <section class="modal-card-body" style="width: auto">
						Basic Things You Can Do Here:<br>
							1. Add/Remove courses.<br>
							2. Check courses/professors details.<br>
							3. <strong>Link courses you chose into my.pitt account by a single click.</strong><br>
							4. <strong>Share your schedule with your friends.</strong><br>
							If you have any suggestions, please click "feedback" button on the top.
					</section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button">Empty The Cart</button>
                        <button class="button is-primary">Link Courses Into Pitt Account</button>
                    </footer>
                </div>

        `
		}
		
		//Content of feedBack modal
		const feedBackModalContent = {
		data(){
			return {
				is_willing:"",
				suggestions:""
			}	
		},
        template: `
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Feedback</p>
                    </header>
                    <section class="modal-card-body">
                    <b-field label="Will you keep using this website after alpha testing?">
                        <b-input
                            type="text"
                            placeholder="Your answer"
							v-model="is_willing"
					
                            >
                        </b-input>
                    </b-field>

                    <b-field label="What other features do you expect? Or do you have any suggestions?">
                        <b-input
                            type="textarea"
                            placeholder="Your answer"
							v-model="suggestions"
                            >
                        </b-input>
                    </b-field>

                </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button"  @click="$parent.close()">Close</button>
                        <button class="button is-primary" @click="sendFeedback()">Send Feedback</button>
                    </footer>
                </div>

        `,
			methods:{
				sendFeedback(){
					var tempArr = {"field1":this.is_willing,"field2":this.suggestions};
					$.ajax(
					{
						type: 'POST',
						url: "feedback.php",
						data: tempArr,
						dataType: "text",
						success: function(resultData) { alert("Thanks for your feedback!") },
						error: function(xhr, textStatus, errorThrown){
							alert('Request Failed.');
						}
					}
				);
				}
			}
		}
		//vue configuration for cart button
		const shoppingCartAppData = {
			
			methods:{
					cartModal() {
						this.$buefy.modal.open({
							parent: this,
							component: shoppingCartModel,
							hasModalCard: true,
							customClass: 'cart_modal_div',
						});
						
				}
			}
		}
		
		//vue configuration for loading div
		const loadingDivAppData = {
			data() {
				return {
					isLoading: false,
					isFullPage: true
				}
			},
			methods:{
				displayLoading(){
					this.isLoading = true;
				},
				hideLoading(){
					this.isLoading = false;
					this.show_notify("Data Updated (If nothing is shown, try to move the horizontal scroll bar to the bottom)");
				},
				show_notify(message){
					this.$buefy.toast.open({
						duration: 2000,
						message: message,
						type: 'is-success'
					})
				}
					,
				show_notify_left_bottom(message){
					this.$buefy.toast.open({
						duration: 1000,
						message: message,
						type: 'is-warning',
						position:'is-bottom-left'
						
					})

				}
				
			}
		}
		
		
		var loadingApp = new Vue(loadingDivAppData);
		loadingApp.$mount("#loading_div");
		
		
		var currentPageNum = 0;
		var url = "/api/v2/search/?"+getUrlComponent();
		appenELementByUrl(url+"&page="+currentPageNum, loadingApp);
		currentPageNum++;
		
		//vue configuration for add to cart and details button
		/*
		const buttonAppData = {
			methods:{
				addToCartNotify(){
					$(".shoping_cart_div").width(200);	
					$("#cart_icon").hide();
					$("#cart_add_text").show();
					
					this.$buefy.toast.open({
						duration: 4000,
						message: `Successfully Add To Cart`,
						type: 'is-success'
					})
					setTimeout(function () {
						$(".shoping_cart_div").width(70);
						$("#cart_icon").show();
						$("#cart_add_text").hide();
					}, 2000);
					
				}
			}
		}
		*/
		
		//vue configuration for nav bar
		const navBarAppData = {
			data(){
				return {
					
				}
			},

			methods:{
					feedBackModal() {
						this.$buefy.modal.open({
							parent: this,
							component: feedBackModalContent,
							hasModalCard: true,
							customClass: 'cart_modal_div',
						});
						
				}
			}
		}
		
		
		
		/*
		const singleCourseContainerData0 = {
			data(){
				return {	
					course_number:"CS 0401 ",
					course_name:"Intermediate programming with java",
					classes:[
						{
							time:"16:00&nbsp;-&nbsp;17:15",
							class_duration:" 1h&nbsp;15min",
							isSelect:{"mon":true,"tue":true},
							course_duration:"2019/04/01 - 2019/04/25",
							place:"G8&nbsp;Cathedral&nbsp;of&nbsp;Learning",
							professor_name:"Jingxuan Zhang",
							professor_nationality:"China",
							total_rating: "4.9",
							difficulty: "2.5",
							take_again_rate: "57%",
							rmp_link:"http://www.ratemyprofessors.com",
							classType:{isRecitation:false,isLecture:true}
						}
						
							]
				}
			},
			methods:{
				addToCartNotify(){
					$(".shoping_cart_div").width(200);	
					$("#cart_icon").fadeOut(400);
					setTimeout(function () {
						$("#cart_add_text").show();
					}, 400);
					
					
					
					this.$buefy.toast.open({
						duration: 3000,
						message: `Successfully Add To Cart`,
						type: 'is-success'
					})
					setTimeout(function () {
						$(".shoping_cart_div").width(70);
						$("#cart_icon").show();
						$("#cart_add_text").hide();
					}, 2000);
					
				},
				getRmpLink(){
					return this.rmp_link;
				}
			}
		}
		*/

		
		//var buttonApp = new Vue(buttonAppData);
		//buttonApp.$mount(".buttons");
		
		var navBarApp = new Vue(navBarAppData);
		navBarApp.$mount("#nav_bar");
		
		var shoppingCartApp = new Vue(shoppingCartAppData);
		shoppingCartApp.$mount(".shoping_cart_div");
		

		
		 $( ".shoping_cart_div" ).draggable();
		
		function openFeedBack()
		{
			navBarApp.feedBackModal();
		}
		
		//Get data from server and display all the courses and class in the data
		function addElement(data){
			if ((data.course_count>0 && data.current_class_count == 0) || data.course_count == 0 )
			{
				hasMoreData = false;
				return;
			}
			var coursesArray = data.courses;
			
			for (var i=0,len=coursesArray.length; i<len ;i++)
			{
				addCourse(coursesArray[i]);
			}
			

				
		}
		
		function addCourse(course_data){
			var courseStr = generateCourseString();
			var classArray = course_data.class_data;
			
			
			const singleCourseContainerData = {
				
				data(){
					return {	
						course_number:course_data.course_num+" ",
						course_name:course_data.course_name,
						classes:classArray
					}
				},
			methods:{
				nameSort: function (a,b) {
					if (a.toLowerCase.indexOf("staff") != -1)
						return -1;
					return 0;
				},
				addToCartNotify(){
					$(".shoping_cart_div").width(200);	
					$("#cart_icon").fadeOut(400);
					setTimeout(function () {
						$("#cart_add_text").show();
					}, 400);
					
					
					
					this.$buefy.toast.open({
						duration: 2000,
						message: `Successfully Add To Cart`,
						type: 'is-success'
					})
					setTimeout(function () {
						$(".shoping_cart_div").width(70);
						$("#cart_icon").show();
						$("#cart_add_text").hide();
					}, 2000);
					
				},
				details(){
					this.$buefy.toast.open({
						duration: 2000,
						message: `Coming soon`,
						type: 'is-danger'
					})
				}
			},
			  computed:{
				sortedClasses:function(){
					 return sortByKey(this.classes);
				  }

			  }
		}
			
			//append coursestring
			$(".result_table_container").append(courseStr);
			
			//register vue
			var apps = new Vue(singleCourseContainerData);
			apps.$mount("#single_course_container"+courseNum);
			

			
			courseNum++;
		}
		

		function sortByKey(array){
			return array.sort(function(a,b){
				var x = a['professor_name'];
				var y = b['professor_name'];
				
				const notAssign = "not assigned";
				if (x.toLowerCase().indexOf(notAssign) !== -1 && y.toLowerCase().indexOf(notAssign) === -1)
				{
					return 1;
				}
				if (x.toLowerCase().indexOf(notAssign) === -1 && y.toLowerCase().indexOf(notAssign) !== -1)
				{
					return -1;
				}
				
				if (x.toLowerCase().indexOf("staff") !== -1 && y.toLowerCase().indexOf("staff") === -1)
				{
					return 1;
				}
				if (x.toLowerCase().indexOf("staff") === -1 && y.toLowerCase().indexOf("staff") !== -1)
				{
					return -1;
				}
				
				if ((x.toLowerCase().indexOf("staff") !== -1 && y.toLowerCase().indexOf("staff") !== -1)||x.toLowerCase().indexOf(notAssign) !== -1 && y.toLowerCase().indexOf(notAssign) !== -1)
				{
					if (a['classType']['isLecture'] && !b['classType']['isLecture']) //if a is lec but b is not
					{
						return -1;
					}
					if (!a['classType']['isLecture'] && b['classType']['isLecture']) //if b is lec but a is not
					{
						return 1;
					}
				}

				
				return 0;
			})
		}
		
		function generateCourseString(){
			return `<div id="single_course_container`+courseNum+`" class="single_course_container col-md-8 col-md-offset-2 col-sm-10 col-xs-10 col-sm-offset-1 col-xs-offset-1"> <h1 style="font-size: 35px;">{{course_number}}<span style="font-size: 25px;">{{course_name}}</span></h1> <div class="single_result_container col-md-12 col-sm-12 col-xs-12" v-for="classs in sortedClasses"> <div class="lecture_indicator" v-bind:class="{ is_recitation:classs.classType.isRecitation, is_lecture:classs.classType.isLecture, is_lab:classs.classType.isLab}"><span v-if="classs.classType.isRecitation">REC</span><span v-if="classs.classType.isLecture">LEC</span><span v-if="classs.classType.isLab">LAB</span></div> <div class="info col-md-10 col-sm-10 col-xs-10"> <div class="class_info"> <div class="row"> <div class="col-md-3"> <strong><span style="font-size: 22px;color: #333;" v-html="classs.time"></span></strong><span v-html="classs.class_duration" style="font-size: 15px;"></span> </div> <div class="col-md-4 col-md-offset-1"> <div class="day_indicator"> <li class="day_indicator_single left_b" v-bind:class="{ day_select:classs.isSelect.mo }">Mo</li> <li class="day_indicator_single " v-bind:class="{ day_select:classs.isSelect.tu }">Tu</li> <li class="day_indicator_single " v-bind:class="{ day_select:classs.isSelect.we }">We</li> <li class="day_indicator_single " v-bind:class="{ day_select:classs.isSelect.th }">Th</li> <li class="day_indicator_single " v-bind:class="{ day_select:classs.isSelect.fr }">Fr</li> </div> </div> <div class="col-md-4"> <span>{{classs.course_duration}}</span> </div> </div> <div class="row " style="margin-top: 5px;"> <div class="col-md-3" v-html="classs.place"> </div> </div> </div> <div class="professor_info"> <div class="col-md-4"> <div class="row"> <div class="col-md-12"> <strong><span><a :href="classs.rmp_link">{{classs.professor_name}}</a></span></strong> </div> </div> <div class="row"> <div class="col-md-12"> <span class="">{{classs.professor_nationality}}</span> </div> </div> </div> <div class="col-md-8"> <div class="col-md-12 row professor_rating_div"> <span class="">Total Rating: {{classs.total_rating}}</span> <span style="margin-left: 30px;margin-right: 30px;">Difficulty: {{classs.difficulty}}</span> <span style="">Take&nbsp;again:&nbsp;{{classs.take_again_rate}}</span> </div> <div class="col-md-12 row professor_rating_div"> </div> <span style="float: right;font-size: 13px;color: #C0C0C0;"> From Ratemyprofessors.com </span> </div> </div> </div> <div class="buttons col-md-2" > <div class="col-md-12 " style="padding-top:30px;"> <div style="width:100%;"> <b-button type="is-link" @click="addToCartNotify" icon-right="plus" style="margin-top:10px;margin-bottom:10px;float:none;" class="row" outlined>Add</b-button> </div> <b-button type="is-info" icon-right="arrow-right" class="row" style="float:none;" @click="details" outlined>Details</b-button> </div> </div> </div> </div>`
		}
		
		$(window).scroll(function(){
				
				if (!hasMoreData)
				{
					return;
				}
				var scrollTop = $(this).scrollTop();
				var scrollHeight = $(document).height();
				var windowHeight = $(this).height();
				if(scrollTop + windowHeight == scrollHeight ){
				  appenELementByUrl(url+"&page="+currentPageNum,loadingApp,true);
				  currentPageNum++;

			}
			});
		
	</script>
</body>
</html>