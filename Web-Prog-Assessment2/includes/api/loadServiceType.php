<?php
include_once "api-header.php";

$serviceID = $_GET['serviceID'];

// connect to database
$result = $mysqli->query("SELECT * FROM service_instruction WHERE service_id='" . $serviceID . "'");


$response = array();

while ($row = $result->fetch_assoc()) {
    // return with json format
    $response[] = $row['service_type'];
}

// encode it with json and send it back
echo json_encode($response);

mysqli_close($mysqli);



