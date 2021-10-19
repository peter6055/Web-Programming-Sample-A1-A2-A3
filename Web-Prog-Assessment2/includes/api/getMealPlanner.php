<?php
include_once "api-header.php";

$total_calories = $_GET['total_calories'];
$type = $_GET['type'];
$email = $_GET['email'];

// ------------------------------------ Initialize storage --------------------------------------
//for meal that is selected (will be return back)
$array_meal = array();
$array_meal_length = 0;

// array to store calories for each diet
$diet_calories = array();

// total calories per meal without deduction
$diet_calories_no_deduction = array();



// array to store calories remain for each diet when calculating
//$diet_remaining_calories = array();

// array to store all the meal from db
$array_meal_local = array();
$array_meal_local_length = 0;

// ------------------------------------ Initialize storage --------------------------------------


// Calculate the amount of calories per diet
// 0:breakfast / 1:lunch / 2:dinner
$diet_calories[0] = round($total_calories * 0.3);
$diet_calories[1] = round($total_calories * 0.5);
$diet_calories[2] = round($total_calories * 0.2);

$diet_calories_no_deduction[0] = round($total_calories * 0.3);
$diet_calories_no_deduction[1] = round($total_calories * 0.5);
$diet_calories_no_deduction[2] = round($total_calories * 0.2);


// ----------------------- Get all the data from DB and store it into a local array -----------------------------
// get all the query back.

if(strcasecmp($type, "Anything") == 0){
    // when user accept anything
    $data = $mysqli->query("SELECT * FROM `meal`");
} else {
    // when meal is limited by type
    $data = $mysqli->query("SELECT * FROM `meal` WHERE `type` = '" . $type . "'");

}


// decode data and put the meal in local 2d array
while ($data_fetched = $data->fetch_assoc()) {
    $array_meal_local[] = array_values($data_fetched);

    // count array length
    $array_meal_local_length++;
}
// ----------------------- Get all the data from DB and store it into a local array -----------------------------


// ----------------------- Start to find suitable meal for each diet  -----------------------------
// three diet a day
for ($dietCount = 0; $dietCount < 3; $dietCount++) {


    // generate random number, this number is to create different meal every time
    // it will be reset in each diet
    $random = rand(0, $array_meal_local_length-1);


    // the next array inspect will start from a random object/
    // however, if we are not able to get the sutiable object, we will bounce back to the first one
    // thus, if it bounces back once, no second time!
    $isBouncesBack = false;

    // start inquiring the suitable meal detail
    for ($countArray = $random; $countArray < $array_meal_local_length; $countArray++) {

        // for note repeat
        $isMealRepeat = false;

        // check meal reputation if there are some things inside storage array
        if (!empty($array_meal)) {
            // find the is there any repeat meal one by one
            for ($countReaptFinder = 0; $countReaptFinder < $array_meal_length; $countReaptFinder++) {

                // matching id to see the repeat
                if ($array_meal[$countReaptFinder][0] == $array_meal_local[$countArray][0]) {

                    //note
                    $isMealRepeat = true;
                    //end loop
                    $countReaptFinder = 999999999999999999999;
                }
            }
        }

        // if the meal repeat then don't process the add to array feature
        if ($isMealRepeat == false && intval($array_meal_local[$countArray][3]) <= $diet_calories[$dietCount]) {
            // add the meal to storage
            $array_meal[$array_meal_length] = $array_meal_local[$countArray];

            // add a parameter of diet
            $array_meal[$array_meal_length][5] = $dietCount;

            // minus remain cal
            $diet_calories[$dietCount] = $diet_calories[$dietCount] - intval($array_meal[$array_meal_length][3]);

            // increase returned data length
            $array_meal_length++;
        }


        // reaching the last row data and not bounces back before
        // brings it back to first one.
        if ($isBouncesBack == false && $countArray+1 == $array_meal_local_length){
            $isBouncesBack = true;
            $countArray = 0;
        }
    }
}
// ----------------------- Start to find suitable meal for each diet  -----------------------------



// ------------------------------------- Store in database  ---------------------------------------


$mysqli->query("DELETE FROM `user_meal` WHERE email = '".$email."'");


for($countMeal=0 ; $countMeal < $array_meal_length; $countMeal++){
    $mysqli->query("INSERT INTO `user_meal` (`email`, `meal_id`, `servings`, `diet`) VALUES ('".$email."', '".$array_meal[$countMeal][0]."', '1', '".$array_meal[$countMeal][5]."')");
}


// ---------------- Calculate the info of meal and pass it back for display  -----------------------------
// The last place of array use for info transfer
// Sequence: Total food cal, Remain food cal, Break total, Break remain, Lunch total, Lunch remain, Dinner total, Dinner remain
$total_calories_meal = 0;

for($dietCount = 0; $dietCount < 3; $dietCount++){

    $total_calories_meal+= $diet_calories_no_deduction[$dietCount] - $diet_calories[$dietCount];

    //total cal per diet
    $array_meal[$array_meal_length][$dietCount+$dietCount+2] = $diet_calories_no_deduction[$dietCount] - $diet_calories[$dietCount];

    //remain cal per diet
    $array_meal[$array_meal_length][$dietCount+$dietCount+3] = $diet_calories[$dietCount];

}
// put remain food cal in the first place, the previous will be push to second place
array_unshift($array_meal[$array_meal_length],($total_calories - $total_calories_meal));

// put total food cal in the first place, remain cal will be push back to second place
array_unshift($array_meal[$array_meal_length],$total_calories_meal);
// ---------------- This part is to calculate the info of meal and pass it back for display  -----------------------------


echo json_encode($array_meal);



