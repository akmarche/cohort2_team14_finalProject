<?php
class TurbineDeployed
{
  public $turbineDeployedId;
  public $turbineId;
  public $siteId;
  public $serialNumber;
  public $deployedDate;
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;

  public function __construct($data) {
    $this->turbineDeployedId = isset($data['turbineDeployedId']) ? intval($data['turbineDeployedId']) : null;
    $this->turbineId = $data['turbineId'];
    $this->siteId = $data['siteId'];
    $this->serialNumber = $data['serialNumber'];
    $this->deployedDate = $data['deployedDate'];
    $this->totalFiredHours = $data['totalFiredHours'];
    $this->totalStarts = $data['totalStarts'];
    $this->lastPlannedOutageDate = $data['lastPlannedOutageDate'];
    $this->lastUnplannedOutageDate = $data['lastUnplannedOutageDate'];
  }

  public static function fetchAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM TurbineDeployed';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theTurbineDeployed =  new TurbineDeployed ($row);
      array_push($arr, $theTurbineDeployed);
    }
    return $arr;
  }

  public function create() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT TurbineDeployed (turbineDeployedId, turbineId, siteId, serialNumber, deployedDate, totalFiredHours, totalStarts, lastPlannedOutageDate, lastUnplannedOutageDate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->turbineDeployedId,
      $this->turbineId,
      $this->siteId,
      $this->serialNumber,
      $this->deployedDate,
      $this->totalFiredHours,
      $this->totalStarts,
      $this->lastPlannedOutageDate,
      $this->lastUnplannedOutageDate,
    ]);
    $this->turbineDeployedId = $db->lastInsertId();
  }
}
