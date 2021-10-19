<?php
include_once "api-header.php";

$email = $_GET['email'];
$serviceID = $_GET['serviceID'];
$type = $_GET['type'];
$date = $_GET['date'];
$duration = $_GET['duration'];

// Query
$mysqli->query("INSERT INTO `user_service` (`user_service_id`, `email`, `service_id`, `service_type`, `date_performed`, `duration_minutes`) VALUES (NULL, '".$email."', '".$serviceID."', '".$type."', '".$date."', '".$duration."')");


// Tutorial path (by the auto increment id from the previous insert)
$tutorial = $mysqli->query("SELECT * FROM user_service LEFT JOIN service_instruction ON service_instruction.service_id = user_service.service_id AND service_instruction.service_type = user_service.service_type WHERE user_service_id ='" .$mysqli->insert_id."'");

// decode db array
$tutorial_fetched = $tutorial->fetch_assoc();

// return file path
echo $tutorial_fetched['path'];

mysqli_close($mysqli);