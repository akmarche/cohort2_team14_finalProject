<?php
class Note
{
  public $clientName;
  public $notes;
  public function __construct($data) {
    $this->clientId = $data['clientName'];
    $this->notes = $data['notes'];
  }

  public static function fetchAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM ClientNotes';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theNote =  new Note($row);
      array_push($arr, $theNote);
    }
    return $arr;
  }

  public function addNotes() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT ClientNotes (clientName, notes)
            VALUES (?, ?)';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->clientId,
      $this->notes,
    ]);
  }
}
