<?php
// except return:
// array type & amount this year

include_once "api-header.php";

$user_email = $_GET['user_email'];
$service_name = $_GET['service_name'];
$chart_name = $_GET['chart_name'];

$result= array();
$result_length = 0;

$response= array();

$data = 0;

// connect to database
if($chart_name == "service_type_bar_chart"){
    $data = $mysqli->query("SELECT COUNT(service_type), service_type FROM service JOIN user_service ON service.service_id = user_service.service_id WHERE email = '".$user_email."' AND name LIKE '".$service_name."' GROUP BY service_type");
} else if ($chart_name == "service_duration_bar_chart"){
    $data = $mysqli->query("SELECT SUM(duration_minutes), service_type FROM service JOIN user_service ON service.service_id = user_service.service_id WHERE email = '".$user_email."' AND name LIKE '".$service_name."' GROUP BY service_type");
} else if ($chart_name == "service_time_line_graph"){
    $data = $mysqli->query("SELECT SUM(duration_minutes), MONTH(date_performed),name FROM service JOIN user_service ON service.service_id = user_service.service_id WHERE email = '".$user_email."' AND YEAR(date_performed) = YEAR(CURDATE()) AND name LIKE '".$service_name."' GROUP BY MONTH(date_performed)");
} else if ($chart_name == "calories_per_diet_pie_chart"){
    $data = $mysqli->query("SELECT `diet`, SUM(calories) FROM meal  JOIN user_meal ON user_meal.meal_id = meal.meal_id WHERE email = '".$user_email."' GROUP BY diet ORDER BY diet ASC");
} else {
    echo "Error, please give the correct chart_name request";
    exit;
}

// decode data
while ($data_fetched = $data->fetch_assoc()) {
    $result[] = array_values($data_fetched);
    $result_length++;
}


if($chart_name == "service_type_bar_chart" || $chart_name == "service_duration_bar_chart"){
    for($count = 0 ; $count < $result_length ; $count++){
        $response[0][$count] = $result[$count][0];
        $response[1][$count] = $result[$count][1];
    }
}

if($chart_name == "service_time_line_graph"){
    // each month
    for($count_month = 1 ; $count_month < 13 ; $count_month++){

        // put the data in to each month, if there are no data matched in that month put "zero" insides.
        for($count_array = 0 ; $count_array < $result_length ; $count_array++){
            if($result[$count_array][1] == $count_month){
                $response[$count_month-1] = $result[$count_array][0];
                $count_array = 9999999;

            }


            if ($count_array == $result_length-1) {
                $response[$count_month-1] = 0;

                $count_array = 9999999;
            }
        }
    }
}


if($chart_name == "calories_per_diet_pie_chart"){
    for($count = 0 ; $count < $result_length ; $count++){
        $response[$count] = $result[$count][1];
    }
}

//echo implode(",", $response);


echo json_encode($response);
