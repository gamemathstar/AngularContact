<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$data = $_POST;

$inp = file_get_contents('../resources/json/dummy.json');
$tempArray = json_decode($inp);
array_push($tempArray, $data);
$jsonData = json_encode($tempArray);
file_put_contents('../resources/json/dummy.json', $jsonData);
echo json_encode($jsonData);
