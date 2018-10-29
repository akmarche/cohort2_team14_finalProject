<?php
class HeatRate
{
  public $dataCollectedDate;
  public $turbineId;
  public $sensorId;
  public $heatRate;

  public function __construct($data) {
    $this->turbineId = isset($data['turbineId']) ? intval($data['turbineId']) : null;
    $this->sensorId = isset($data['sensorId']) ? intval($data['sensorId']) : null;
    $this->dataCollectedDate = $data['dataCollectedDate'];
    $this->heatRate = $data['heatRate'];
  }

  public static function fetchAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM heatRate';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theHeatRate =  new HeatRate($row);
      array_push($arr, $theHeatRate);
    }
    return $arr;
  }
}
