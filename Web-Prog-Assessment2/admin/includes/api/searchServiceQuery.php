<?php

// contain response code and data
$response = array();

if (empty($_GET['search']) || !isset($_GET['search'])){
    $response[0] = 0;
    $response[1] = "Please type some keywords in order to search.";
    echo json_encode($response);
    exit;
}

$search = $_GET['search'];

if (strlen($search) < 2){
    $response[0] = 0;
    $response[1] = "Please type more than two alphabet to search.";
    echo json_encode($response);
    exit;
}

if(stripos("yoga", $search) !== false){
    $response[0] = 1;
    $response[1] = "yoga";


} elseif (stripos("meditation", $search) !== false){
    $response[0] = 1;
    $response[1] = "meditation";

} elseif (stripos("stretching", $search) !== false){
    $response[0] = 1;
    $response[1] = "stretching";

} elseif (stripos("healthy habits", $search) !== false){
    $response[0] = 1;
    $response[1] = "healthy-habits";

} else {
    $response[0] = 0;
    $response[1] = "No Results";
}




echo json_encode($response);