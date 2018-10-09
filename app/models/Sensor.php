<?php
class Sensor
{
  public $sensorId;
  public $sensorName;
  public $sensorDescription;
  public $manufacturer;
  public $totalLifeExpentancyHours;

  public function __construct($data) {
    $this->sensorId = isset($data['sensorId']) ? intval($data['sensorId']) : null;
    $this->sensorName = $data['sensorName'];
    $this->sensorDescription = $data['sensorDescription'];
    $this->manufacturer = $data['manufacturer'];
    $this->totalLifeExpentancyHours = isset($data['totalLifeExpentancyHours']) ? intval($data['totalLifeExpentancyHours']) : null;
  }

  public static function fetchAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM Sensor';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensor =  new Sensor($row);
      array_push($arr, $theSensor);
    }
    return $arr;
  }
}
