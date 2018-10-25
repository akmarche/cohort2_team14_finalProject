<?php
class Note
{
  public $clientName;
  public $notes;

  public function __construct($data) {
    $this->clientName = $data['clientName'];
    $this->notes = $data['notes'];
  }

  public function addNotes() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = "UPDATE Client SET notes = '$this->notes' WHERE clientName = '$this->clientName'";
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->notes,
    ]);
  }
}
