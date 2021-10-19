<?php
include_once "api-header.php";

// connect to database
$result = $mysqli->query("SELECT * FROM user");


while ($row = $result->fetch_assoc()) {
    // return with json format
    echo '<option  value="' .$row['email']. '">' .$row['first_name']. '&nbsp;' .$row['last_name']. ' (' .$row['email']. ')</option>';
}

mysqli_close($mysqli);



