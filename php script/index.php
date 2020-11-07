<?php

header('Content-Type: application/json');

if(!isset($_GET['country'])) {
    $country = 'Romania';
}else{
    $country = $_GET['country'];
}

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://covid-19.dataflowkit.com/v1/".$country,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $json = json_decode($response);

    $array = array(

        'active_cases' => $json->{'Active Cases_text'},
        'country' => $json->{'Country_text'},
        'last_update' => $json->{'Last Update'},
        'new_cases' => $json->{'New Cases_text'},
        'new_deaths' => $json->{'New Deaths_text'},
        'total_cases' => $json->{'Total Cases_text'},
        'total_deaths' => $json->{'Total Deaths_text'},
        'total_recovered' => $json->{'Total Recovered_text'}

    );

    echo json_encode($array);

}