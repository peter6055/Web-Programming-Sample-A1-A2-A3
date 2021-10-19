<?php

ini_set("display_errors", 1);
error_reporting(E_ALL);

// Make DB connection.
$mysqli = new mysqli("www.databaseaustralia.com", "****************", "****************", "****************");

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}


