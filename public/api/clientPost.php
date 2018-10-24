<?php
$client = new Client($_POST);
$client->addNotes();
echo json_encode($client);
