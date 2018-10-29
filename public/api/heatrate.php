<?php
require '../../app/common.php';

// 1. Go to the database and get all work associated with the $taskId
$kpis = HeatRate::fetchAll();
// 2. Convert to JSON
$json = json_encode($kpis, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
