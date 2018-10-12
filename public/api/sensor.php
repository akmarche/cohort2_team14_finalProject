<?php
require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorPost.php';
  exit;
}
// 1. Go to the database and get all work associated with the $taskId
$sensors = Sensor::fetchAll();
// 2. Convert to JSON
$json = json_encode($sensors, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;