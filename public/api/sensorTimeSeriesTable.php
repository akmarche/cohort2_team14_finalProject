<?php
require '../../app/common.php';

$sensorDeployedId = intval($_GET['sensorDeployedId'] ?? 0);

if($sensorDeployedId < 1){
  $sensorTimeSeries = SensorTimeSeriesTable::fetchAll();
  $json = json_encode($sensorTimeSeries, JSON_PRETTY_PRINT);
  header('Content-type: application/json');
  echo $json;
}
else{
  $sensorTimeSeriesByTurbineId = SensorTimeSeriesTable::fetchTimeSeriesByTurbineId($turbineId);
    $json = json_encode($sensorTimeSeriesByTurbineId, JSON_PRETTY_PRINT);
    header('Content-Type: application/json');
    echo $json;
}
