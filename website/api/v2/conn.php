<?php
$servername = "192.168.1.144";
$username = "root";
$password = "xuan32546";
 
// 创建连接
$conn = new mysqli($servername, $username, $password);
 
// 检测连接
if ($conn->connect_error) {
    die("Database Connect Error" . $conn->connect_error);
} 
mysqli_select_db($conn, 'pitt_course' );


?>