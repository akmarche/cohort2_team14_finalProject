<?php
class SensorTimeSeries
{
  public $sensorDeployedId;
  public $dataCollectedDate;
  public $output;
  public $heatRate;
  public $compressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;
  public $starts;

  public function __construct($data) {
    $this->sensorDeployedId = isset($data['sensorDeployedId']) ? intval($data['sensorDeployedId']) : null;
    $this->dataCollectedDate = $data['dataCollectedDate'];
    $this->output = $data['output'];
    $this->heatRate = $data['heatRate'];
    $this->compressorEfficiency = $data['compressorEfficiency'];
    $this->availability = $data['availability'];
    $this->reliability = $data['reliability'];
    $this->firedHours = $data['availability'];
    $this->trips = $data['trips'];
    $this->starts = $data['starts'];
  }

  public static function fetchAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM SensorTimeSeries';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensorTimeSeries =  new SensorTimeSeries($row);
      array_push($arr, $theSensorTimeSeries);
    }
    return $arr;
  }

  public function create() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT SensorTimeSeries (sensorDeployedId, dataCollectedDate, output, heatRate, compressorEfficiency, availability, reliability, firedHours, trips, starts)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->sensorDeployedId,
      $this->dataCollectedDate,
      $this->output,
      $this->heatRate,
      $this->compressorEfficiency,
      $this->availability,
      $this->reliability,
      $this->firedHours,
      $this->trips,
      $this->starts,
    ]);
    $this->sensorDeployedId = $db->lastInsertId();
  }
}
