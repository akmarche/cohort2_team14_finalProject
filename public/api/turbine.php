<?php
require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'turbinePost.php';
  exit;
}
// 1. Go to the database and get all work associated with the $taskId
$turbine = Turbine::fetchAll();
// 2. Convert to JSON
$json = json_encode($turbine, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
