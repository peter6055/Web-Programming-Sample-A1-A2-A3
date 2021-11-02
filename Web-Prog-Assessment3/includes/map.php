<?php
//header("Content-type: text/html; charset=utf-8");
//ini_set( "display_errors", 1 );
//error_reporting( E_ALL );

const API_KEY = 'Z0TyTOt9Shzfs01IsWTLkKi7ctt14Yyuv849uRRc-RM';

function map($city, $country){

    $imagePath = 'assets/map/map_' .$city. '.jpg';

    // Open image file, note binary data should be written to using 'w+' mode.
    $imageFile = fopen($imagePath , 'w+');

    // Start curl request.
    $curl = curl_init();

    // Setup curl request.
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://image.maps.ls.hereapi.com/mia/1.6/mapview?w=300&h=300&z=10&i=1&co=' .$country. '&ci=' .$city. '&apiKey=' .API_KEY,
        CURLOPT_FILE => $imageFile,
        CURLOPT_SSL_VERIFYPEER => false
    ));

    // Send request.
    $response = curl_exec($curl);
    curl_close($curl);


    // Close file
    fclose($imageFile);

    // return the path back
    echo $imagePath;
}


