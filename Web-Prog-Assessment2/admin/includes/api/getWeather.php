<?php

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://reg.bom.gov.au/fwo/IDV60901/IDV60901.95936.json',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',

));

$response = curl_exec($curl);
curl_close($curl);

$result = json_decode($response,true);


echo "Welcome, the air temperature in Melbourne is ".$result['observations']['data'][0]['air_temp']. " Celsius&nbsp;&nbsp;&nbsp;&nbsp;";
